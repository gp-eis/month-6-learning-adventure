[CmdletBinding()]
param(
    [string]$Message = 'Publish Month 8 weekly reports',
    [switch]$SkipUpload,
    [switch]$SkipGit,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$RepositoryRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$AccountId = 'c2a2548be2b3c05597922914160a941b'
$BucketName = 'gpeis-month8-report-assets'
$PublisherDirectory = Join-Path $env:LOCALAPPDATA 'GPEIS Publisher'
$CredentialPath = Join-Path $PublisherDirectory 'cloudflare-token.txt'
$ManifestPath = Join-Path $PublisherDirectory 'month8-report-upload-manifest.json'
$Projects = @(
    @{ Source = 'Month8/apps/report-a'; Deploy = 'report-a-m8'; Prefix = 'report-a'; Repository = 'report-levelA-M8' },
    @{ Source = 'Month8/apps/report-b'; Deploy = 'report-b-m8'; Prefix = 'report-b'; Repository = 'report-levelB-M8'; ExternalLevel = 'level-b' },
    @{ Source = 'Month8/apps/report-c'; Deploy = 'report-c-m8'; Prefix = 'report-c'; Repository = 'report-levelC-M8'; ExternalLevel = 'level-c' }
)

function Get-ContentType([string]$Extension) {
    switch ($Extension.ToLowerInvariant()) {
        '.html'  { 'text/html; charset=utf-8' }
        '.css'   { 'text/css; charset=utf-8' }
        '.js'    { 'text/javascript; charset=utf-8' }
        '.json'  { 'application/json; charset=utf-8' }
        '.png'   { 'image/png' }
        '.jpg'   { 'image/jpeg' }
        '.jpeg'  { 'image/jpeg' }
        '.gif'   { 'image/gif' }
        '.webp'  { 'image/webp' }
        '.avif'  { 'image/avif' }
        '.svg'   { 'image/svg+xml' }
        '.mp3'   { 'audio/mpeg' }
        '.wav'   { 'audio/wav' }
        '.ogg'   { 'audio/ogg' }
        '.m4a'   { 'audio/mp4' }
        '.mp4'   { 'video/mp4' }
        '.webm'  { 'video/webm' }
        '.mov'   { 'video/quicktime' }
        '.woff'  { 'font/woff' }
        '.woff2' { 'font/woff2' }
        '.ttf'   { 'font/ttf' }
        '.otf'   { 'font/otf' }
        '.pdf'   { 'application/pdf' }
        default  { 'application/octet-stream' }
    }
}

function ConvertTo-ObjectKey([string]$Value) {
    (($Value -replace '\\', '/') -split '/' | ForEach-Object {
        [Uri]::EscapeDataString($_)
    }) -join '/'
}

function Get-SavedManifest {
    $manifest = @{}
    if (Test-Path -LiteralPath $ManifestPath) {
        $saved = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
        foreach ($property in $saved.PSObject.Properties) {
            $manifest[$property.Name] = $property.Value
        }
    }
    return $manifest
}

function Get-CloudflareHeaders {
    if (-not (Test-Path -LiteralPath $CredentialPath)) {
        throw 'Publisher credentials are missing. Run .\setup-publish.ps1 first.'
    }

    $encryptedToken = [IO.File]::ReadAllText($CredentialPath).Trim()
    $secureToken = ConvertTo-SecureString -String $encryptedToken
    $tokenPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
    try {
        $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($tokenPointer)
        return @{ Authorization = "Bearer $plainToken" }
    }
    finally {
        if ($tokenPointer -ne [IntPtr]::Zero) {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($tokenPointer)
        }
        $plainToken = $null
    }
}

function Get-PublicAssetRoot([hashtable]$Headers) {
    $uri = "https://api.cloudflare.com/client/v4/accounts/$AccountId/r2/buckets/$BucketName/domains/managed"
    $response = Invoke-RestMethod -Uri $uri -Headers $Headers
    if (-not $response.result.enabled) {
        throw "Public access is not enabled for the dedicated bucket '$BucketName'."
    }
    return "https://$($response.result.domain)"
}

function Get-ExternalAssetRelativePaths([hashtable]$Project) {
    $paths = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
    if (-not $Project.ContainsKey('ExternalLevel')) { return @() }

    $questionPath = Join-Path (Join-Path $RepositoryRoot $Project.Source) 'questions-month8.js'
    $source = [IO.File]::ReadAllText($questionPath)
    if ($Project.ExternalLevel -eq 'level-b') {
        foreach ($match in [regex]::Matches($source, 'pictureWord\("([^"]+)"')) {
            [void]$paths.Add("phonics/week-1/$($match.Groups[1].Value)-3d-v1.png")
        }
        foreach ($match in [regex]::Matches($source, 'picturePair\("([^"]+)",\s*"([^"]+)"')) {
            [void]$paths.Add("phonics/week-1/$($match.Groups[1].Value)-3d-v1.png")
            [void]$paths.Add("phonics/week-1/$($match.Groups[2].Value)-3d-v1.png")
        }
        foreach ($match in [regex]::Matches($source, 'fc\((\d),\s*"([^"]+)"\)')) {
            [void]$paths.Add("flashcards/week-$($match.Groups[1].Value)/$($match.Groups[2].Value)-flashcard-v1.png")
        }
    }
    elseif ($Project.ExternalLevel -eq 'level-c') {
        foreach ($match in [regex]::Matches($source, 'phonics:\[([^\]]+)\]')) {
            $words = @([regex]::Matches($match.Groups[1].Value, '"([^"]+)"') | ForEach-Object { $_.Groups[1].Value })
            foreach ($word in $words[0..3]) { [void]$paths.Add("phonics/words/$word.png") }
        }
        $helpers = @{
            w1s = 'flashcards/week-1/speech'
            w2s = 'flashcards/week-2/speech'
            w3  = 'literacy/week-3/reading'
            w4  = 'literacy/week-4/reading'
            w4c = 'literacy/week-4/cats'
        }
        foreach ($helper in $helpers.Keys) {
            foreach ($match in [regex]::Matches($source, "$helper\(`"([^`"]+)`"\)")) {
                [void]$paths.Add("$($helpers[$helper])/$($match.Groups[1].Value)")
            }
        }
    }
    return @($paths)
}

function Build-DeployFolders([string]$PublicRoot) {
    foreach ($project in $Projects) {
        $sourceRoot = Join-Path $RepositoryRoot $project.Source
        $deployRoot = Join-Path $RepositoryRoot $project.Deploy
        $separator = [IO.Path]::DirectorySeparatorChar
        $resolvedRepository = [IO.Path]::GetFullPath($RepositoryRoot).TrimEnd($separator) + $separator
        $resolvedDeploy = [IO.Path]::GetFullPath($deployRoot)
        if (-not $resolvedDeploy.StartsWith($resolvedRepository, [StringComparison]::OrdinalIgnoreCase)) {
            throw "Refusing to rebuild a deployment folder outside the repository: $resolvedDeploy"
        }
        if ($project.Deploy -notin @('report-a-m8', 'report-b-m8', 'report-c-m8')) {
            throw "Unexpected deployment folder: $($project.Deploy)"
        }

        if (Test-Path -LiteralPath $deployRoot) {
            Remove-Item -LiteralPath $deployRoot -Recurse -Force
        }
        New-Item -ItemType Directory -Path $deployRoot -Force | Out-Null

        $assetBase = "$PublicRoot/$($project.Prefix)/assets/"
        $externalPlaceholder = '__GP_EXTERNAL_ASSET_ROOT__/'
        $externalSource = $null
        $externalBase = $null
        if ($project.ContainsKey('ExternalLevel')) {
            $externalSource = "../$($project.ExternalLevel)/assets/"
            $externalBase = "$PublicRoot/$($project.Prefix)/external/$($project.ExternalLevel)/assets/"
        }
        Get-ChildItem -LiteralPath $sourceRoot -File | Where-Object {
            $_.Extension.ToLowerInvariant() -in @('.html', '.css', '.js', '.json')
        } | ForEach-Object {
            $destination = Join-Path $deployRoot $_.Name
            $content = [IO.File]::ReadAllText($_.FullName)
            if ($externalSource) { $content = $content.Replace($externalSource, $externalPlaceholder) }
            $content = $content.Replace('../report-period.js', 'report-period.js')
            $content = $content.Replace('assets/', $assetBase)
            if ($externalBase) { $content = $content.Replace($externalPlaceholder, $externalBase) }
            [IO.File]::WriteAllText($destination, $content, [Text.UTF8Encoding]::new($false))
        }
        Copy-Item -LiteralPath (Join-Path $RepositoryRoot 'Month8/apps/report-period.js') -Destination (Join-Path $deployRoot 'report-period.js') -Force
        New-Item -ItemType File -Path (Join-Path $deployRoot '.nojekyll') -Force | Out-Null
    }
}

$manifest = Get-SavedManifest
$filesToUpload = [System.Collections.Generic.List[object]]::new()
foreach ($project in $Projects) {
    $sourceRoot = Join-Path $RepositoryRoot $project.Source
    $assetRoot = Join-Path $sourceRoot 'assets'
    if (-not (Test-Path -LiteralPath $assetRoot)) {
        throw "Missing asset folder: $assetRoot"
    }

    Get-ChildItem -LiteralPath $assetRoot -File -Recurse | ForEach-Object {
        $relativePath = [IO.Path]::GetRelativePath($assetRoot, $_.FullName) -replace '\\', '/'
        $objectKey = "$($project.Prefix)/assets/$relativePath"
        $signature = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
        $previous = $manifest[$objectKey]
        if ($null -eq $previous -or $previous.signature -ne $signature) {
            $filesToUpload.Add([pscustomobject]@{
                ContentType = Get-ContentType $_.Extension
                FullName = $_.FullName
                Key = $objectKey
                Signature = $signature
                Size = $_.Length
            })
        }
    }

    if ($project.ContainsKey('ExternalLevel')) {
        $externalAssetRoot = Join-Path $RepositoryRoot "Month8/apps/$($project.ExternalLevel)/assets"
        foreach ($relativePath in Get-ExternalAssetRelativePaths $project) {
            $fullName = Join-Path $externalAssetRoot ($relativePath -replace '/', [IO.Path]::DirectorySeparatorChar)
            if (-not (Test-Path -LiteralPath $fullName)) {
                throw "Missing report dependency: $fullName"
            }
            $file = Get-Item -LiteralPath $fullName
            $objectKey = "$($project.Prefix)/external/$($project.ExternalLevel)/assets/$relativePath"
            $signature = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
            $previous = $manifest[$objectKey]
            if ($null -eq $previous -or $previous.signature -ne $signature) {
                $filesToUpload.Add([pscustomobject]@{
                    ContentType = Get-ContentType $file.Extension
                    FullName = $file.FullName
                    Key = $objectKey
                    Signature = $signature
                    Size = $file.Length
                })
            }
        }
    }
}

$totalBytes = 0
if ($filesToUpload.Count -gt 0) {
    $totalBytes = ($filesToUpload | Measure-Object -Property Size -Sum).Sum
}
Write-Host ("Changed report assets: {0} ({1:N2} MB)" -f $filesToUpload.Count, ($totalBytes / 1MB))

if ($DryRun) {
    $filesToUpload | Select-Object Key, @{n='MB';e={[math]::Round($_.Size / 1MB, 2)}} | Format-Table -AutoSize
    Write-Host 'Dry run complete. Nothing was uploaded, built, committed, or pushed.'
    exit 0
}

$headers = Get-CloudflareHeaders
$publicRoot = Get-PublicAssetRoot $headers

if (-not $SkipUpload) {
    $uploaded = 0
    foreach ($file in $filesToUpload) {
        $uploaded++
        Write-Progress -Activity 'Uploading Month 8 report assets to Cloudflare R2' -Status $file.Key -PercentComplete (($uploaded / [Math]::Max(1, $filesToUpload.Count)) * 100)
        $encodedKey = ConvertTo-ObjectKey $file.Key
        $uri = "https://api.cloudflare.com/client/v4/accounts/$AccountId/r2/buckets/$BucketName/objects/$encodedKey"
        $uploadHeaders = @{
            Authorization = $headers.Authorization
            'Cache-Control' = 'no-cache'
        }
        Invoke-WebRequest -Method Put -Uri $uri -Headers $uploadHeaders -InFile $file.FullName -ContentType $file.ContentType | Out-Null
        $manifest[$file.Key] = @{ signature = $file.Signature }
    }
    Write-Progress -Activity 'Uploading Month 8 report assets to Cloudflare R2' -Completed
    New-Item -ItemType Directory -Path $PublisherDirectory -Force | Out-Null
    $manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $ManifestPath -Encoding utf8
    Write-Host "Cloudflare update complete: $uploaded file(s) uploaded."
}

Build-DeployFolders $publicRoot
Write-Host 'GitHub Pages report folders built.'

if ($SkipGit) {
    Write-Host 'GitHub update skipped because -SkipGit was supplied.'
    exit 0
}

Push-Location $RepositoryRoot
try {
    $deployPaths = @($Projects | ForEach-Object { $_.Deploy }) + @('publish-month8-reports.ps1')
    git add -f -- $deployPaths
    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Host 'No report deployment changes to publish to GitHub.'
        exit 0
    }
    git commit -m $Message -- $deployPaths
    if ($LASTEXITCODE -ne 0) { throw 'Git commit failed. Nothing was pushed.' }
    git push origin HEAD:main
    if ($LASTEXITCODE -ne 0) { throw 'Git push failed. The deployment commit remains safely stored locally.' }
    foreach ($project in $Projects) {
        $publishBranch = "publish-$($project.Prefix)-$([DateTime]::UtcNow.ToString('yyyyMMddHHmmssfff'))"
        git subtree split --prefix $project.Deploy --branch $publishBranch | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "Could not prepare $($project.Repository) for publishing." }
        git push "https://github.com/gp-eis/$($project.Repository).git" "$($publishBranch):main"
        $pushResult = $LASTEXITCODE
        git branch -D $publishBranch | Out-Null
        if ($pushResult -ne 0) { throw "Could not publish $($project.Repository)." }
    }
    Write-Host 'GitHub Pages updates complete for the three report repositories.'
}
finally {
    Pop-Location
}

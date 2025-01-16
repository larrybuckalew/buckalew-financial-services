# Create monorepo structure
$rootDir = Get-Location

# Clean up existing monorepo folders
Remove-Item -Path "$rootDir/apps" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$rootDir/packages" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$rootDir/services" -Recurse -Force -ErrorAction SilentlyContinue

# Create new structure
$directories = @(
    "apps/web",
    "apps/admin",
    "packages/shared",
    "packages/ui",
    "packages/types",
    "services/gateway",
    "services/auth",
    "services/portfolio",
    "services/risk"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "Created $dir"
}

# Move Next.js app to apps/web
$nextjsFiles = @(
    "pages",
    "public",
    "src",
    "styles",
    "next.config.js",
    "package.json",
    "tsconfig.json"
)

foreach ($file in $nextjsFiles) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination "apps/web/" -Recurse -Force
        Write-Host "Moved $file to apps/web/"
    }
}

# Move UI components
if (Test-Path "src/components/ui") {
    Copy-Item "src/components/ui/*" -Destination "packages/ui/src/" -Recurse -Force
    Write-Host "Moved UI components to packages/ui/"
}

# Move shared utilities
$sharedItems = @(
    @{Source="src/lib"; Dest="packages/shared/src/lib"},
    @{Source="src/utils"; Dest="packages/shared/src/utils"},
    @{Source="src/types"; Dest="packages/types/src"}
)

foreach ($item in $sharedItems) {
    if (Test-Path $item.Source) {
        Copy-Item "$($item.Source)/*" -Destination $item.Dest -Recurse -Force
        Write-Host "Moved $($item.Source) to $($item.Dest)"
    }
}

# Move service specific code
$serviceMap = @{
    "src/services/auth" = "services/auth/src";
    "src/services/portfolio" = "services/portfolio/src";
    "src/services/security" = "services/risk/src"
}

foreach ($service in $serviceMap.Keys) {
    if (Test-Path $service) {
        Copy-Item "$service/*" -Destination $serviceMap[$service] -Recurse -Force
        Write-Host "Moved $service to $($serviceMap[$service])"
    }
}

Write-Host "Reorganization complete!"

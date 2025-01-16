# PowerShell script to reorganize the project structure

Write-Host "Starting project reorganization..." -ForegroundColor Green

# Create base directories
$baseDirs = @(
    "apps/web",              # Next.js frontend
    "apps/admin",            # Admin dashboard
    "services/auth",         # Authentication service
    "services/portfolio",    # Portfolio management
    "services/risk",         # Risk assessment
    "services/gateway",      # API Gateway
    "packages/shared",       # Shared utilities
    "packages/ui",          # Shared UI components
    "packages/types"         # Shared TypeScript types
)

foreach ($dir in $baseDirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "Created directory: $dir" -ForegroundColor Yellow
}

# Move Next.js app to apps/web
$nextjsFiles = @(
    "pages",
    "public",
    "styles",
    "components",
    "next.config.js",
    "package.json",
    "tsconfig.json",
    "app"
)

foreach ($file in $nextjsFiles) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination "apps/web/" -Recurse -Force
        Write-Host "Copied $file to apps/web/" -ForegroundColor Green
    } else {
        Write-Host "Warning: $file not found in source directory" -ForegroundColor Yellow
    }
}

# Move admin-related files
if (Test-Path "admin") {
    Copy-Item -Path "admin/*" -Destination "apps/admin/" -Recurse -Force
    Write-Host "Copied admin files to apps/admin/" -ForegroundColor Green
}

# Copy service-specific code
$serviceMapping = @{
    "src/app/api/auth" = "services/auth/src/api"
    "src/app/auth" = "services/auth/src/components"
    "src/services/portfolio" = "services/portfolio/src"
    "src/services/security" = "services/risk/src"
}

foreach ($source in $serviceMapping.Keys) {
    $destination = $serviceMapping[$source]
    if (Test-Path $source) {
        New-Item -ItemType Directory -Force -Path $destination | Out-Null
        Copy-Item -Path "$source/*" -Destination $destination -Recurse -Force
        Write-Host "Copied $source to $destination" -ForegroundColor Green
    } else {
        Write-Host "Warning: $source not found" -ForegroundColor Yellow
    }
}

# Copy shared components and utilities
$sharedMapping = @{
    "src/components/ui" = "packages/ui/src"
    "src/types" = "packages/types/src"
    "src/lib" = "packages/shared/src/lib"
    "src/utils" = "packages/shared/src/utils"
    "middleware" = "packages/shared/src/middleware"
}

foreach ($source in $sharedMapping.Keys) {
    $destination = $sharedMapping[$source]
    if (Test-Path $source) {
        New-Item -ItemType Directory -Force -Path $destination | Out-Null
        Copy-Item -Path "$source/*" -Destination $destination -Recurse -Force
        Write-Host "Copied $source to $destination" -ForegroundColor Green
    } else {
        Write-Host "Warning: $source not found" -ForegroundColor Yellow
    }
}

Write-Host "`nProject reorganization complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the new directory structure" -ForegroundColor Yellow
Write-Host "2. Update import paths in the code" -ForegroundColor Yellow
Write-Host "3. Run 'npm install' in the root directory" -ForegroundColor Yellow

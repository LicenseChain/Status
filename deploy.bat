@echo off
echo Deploying LicenseChain Status Page...

echo.
echo Building the application...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Build successful! Ready for deployment.
echo.
echo To deploy to Vercel:
echo 1. Install Vercel CLI: npm i -g vercel
echo 2. Run: vercel --prod
echo 3. Configure domain: status.licensechain.app
echo.
echo To deploy to other platforms:
echo - The 'out' directory contains the built files
echo - Upload to your hosting provider
echo.

echo Press any key to continue...
pause > nul

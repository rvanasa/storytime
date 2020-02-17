rem VERY VERY TEMPORARY

echo y | rmdir /S docs
node node_modules\webpack\bin\webpack.js
Xcopy /E /I www\assets docs

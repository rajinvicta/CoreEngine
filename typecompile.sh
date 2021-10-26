rm dist/*d.ts
tsc --declaration --target es2015 --outDir temp/types
dts-bundle --name CoreEngine --main temp/types/Core/CoreEngine.d.ts
cp temp/types/Core/CoreEngine.d.ts dist/CoreEngine.d.ts
rm -rf temp

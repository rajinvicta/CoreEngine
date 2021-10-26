const gulp = require("gulp");
const webserver = require("gulp-webserver");

const exec = require('child_process').exec;
const webpack = require('webpack-stream');

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

var CalculateDeps = require('./CalculateDeps.js');

// config object for tasks
const config = {
    calculateDeps: {
        src: ['./src/Core/'],
        dest: 'src/Dep/ControlContainer.ts',
        //Maintain no space between commas!
        single: ['World', 'Events', 'Server', 'PhGame', 'Loop', 'Config'],
        ignore: []
    },
    browserify: {
        entries: [
            'src/main.ts'
        ],
        outfile: "coreengine.js",
        sourcemaps_dir: ".",
        out_dir: "dist/"
    },
    uglify: {
        src: 'dist/coreengine.js',
        dest: 'dist/'
    },
    watch: {
      locations: ['./src/Core', './src/main.ts', './index.html']
    }
}

function handleError(error) {

    console.error(error);

    this.emit("end");
}


function compileTS() {
  return gulp.src('src/main.ts')
    .pipe(webpack({
      entry: './src/main.ts',
      mode: 'development',
      optimization: {
        minimizer: [new UglifyJsPlugin({
          cache: './uglifycache.db'
        })],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: {
              loader: 'ts-loader',
              options: {
                //transpileOnly: true
              }
            },
          }
        ],
      },
      resolve: {
        extensions: [
          '.ts',
        ],
      },
      output: {
        filename: 'coreengine.js',
        path: path.resolve(__dirname, './dist/')
      },
      performance: {
        maxEntrypointSize: 512000*10,
        maxAssetSize: 512000*10
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin()
      ]
    }))
    .on('error', handleError)
    .pipe(gulp.dest('dist/'));
}


function calculateDeps(done) {
    let calculateDeps = new CalculateDeps();

    let src = config.calculateDeps.src;
    let dest = config.calculateDeps.dest;
    let single = config.calculateDeps.single;
    let ignore = config.calculateDeps.ignore;


    calculateDeps.refreshDeps(src, dest, single, ignore);
    done();
}

function genDecs(){
    return new Promise((resolve, reject) => {

        exec('sh typecompile.sh',
        (error, stdout, stderr) => {
            if(stdout){
                resolve('generated declarations');
            }
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });

}


async function server() {
    gulp.src("./")
        .pipe(webserver({
          host: "0.0.0.0",
          livereload: false,
          open: true,
          port: 3000
        }));
}

async function watch() {
  gulp.watch(config.watch.locations, gulp.series(calculateDeps, gulp.parallel(genDecs, compileTS)));
}


exports.default = gulp.series(calculateDeps, gulp.parallel(genDecs, compileTS), watch, server);

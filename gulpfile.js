const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Paths
const paths = {
    scss: "./src/scss/*.scss",
    css: "./src/dist/css",
    html: "./src/**/*.html"
};

// Compile SCSS to CSS
function compileSCSS() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())  // Initialize sourcemaps
        .pipe(sass().on("error", sass.logError)) // Compile SCSS
        .pipe(postcss([autoprefixer()])) // Add vendor prefixes
        .pipe(cleanCSS()) // Minify CSS
        .pipe(sourcemaps.write(".")) // Write sourcemaps
        .pipe(gulp.dest(paths.css)) // Save to destination
        .pipe(browserSync.stream()); // Inject changes
}

// Watch for changes
function watchFiles() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch(paths.scss, compileSCSS);
    gulp.watch(paths.html).on("change", browserSync.reload);
}

// Define gulp tasks
gulp.task("scss", compileSCSS);
gulp.task("watch", watchFiles);

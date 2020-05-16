var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');


var jsVendorFiles = [
    'node_modules/vis-network/standalone/umd/vis-network.min.js',
];

var cssVendorFiles = [
    'node_modules/vis-network/dist/dist/vis-network.min.css',
];
var sassFiles = './netbox_topology_views/static_dev/css/*.scss',
    cssDest = './netbox_topology_views/static/netbox_topology_views/css/';

var jsLocalResourceFiles = './netbox_topology_views/static_dev/js/*.js',
    jsDest = './netbox_topology_views/static/netbox_topology_views/js/';


function styles_local() {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(cssDest));

}
exports.styles_local = styles_local

function styles_vendor() {
    return gulp.src(cssVendorFiles)
        .pipe(concat('vendor.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(cssDest))
}
exports.styles_vendor = styles_vendor

function js_local() {
    return gulp.src(jsLocalResourceFiles)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
}
exports.js_local = js_local

function js_vendor() {
    return gulp.src(jsVendorFiles)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))

}
exports.js_vendor = js_vendor

function js_local_dev() {
    return gulp.src(jsLocalResourceFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
}
exports.js_local_dev = js_local_dev

function js_vendor_dev() {
    return gulp.src(jsVendorFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(jsDest))

}
exports.js_vendor_dev = js_vendor_dev

exports.css = gulp.series(styles_local, styles_vendor);

exports.js = gulp.series(js_local, js_vendor);
exports.js_dev = gulp.series(js_local_dev, js_vendor_dev);

exports.build = gulp.series(exports.css, exports.js);
exports.build_dev = gulp.series(exports.css, exports.js_dev);
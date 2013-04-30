basePath = '../app';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../test/lib/jquery.min.js',
  'lib/angular/angular.js',
  'lib/angular/angular-*.js',
  '../test/lib/angular/angular-mocks.js',
  '../test/lib/sinon-1.6.0.js',
  'js/**/*.js',
  '../test/unit/**/*.js',
  'partials/directives/*.html'
];

preprocessors = {
    'partials/directives/*.html': 'html2js'
}

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};

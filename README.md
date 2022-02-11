# GET: Gulp, ES6, TailwindCSS

**A starter project that GETs you up and running with Gulp (v4), ES6 JavaScript
modules, and TailwindCSS (v3).**

Great as a kickstart template for trying out TailwindCSS, quickly generating
simple sites, mocking up design components or wireframes, or working on SPAs.

<div align="center">
<strong><a href="https://github.com/rootwork/GET/issues/new?assignees=&labels=Type%3A+Bug&template=01_bug_report.yml&title=bug%3A+">Report a Bug</a>
-
<a href="https://github.com/rootwork/GET/issues/new?assignees=&labels=Type%3A+Feature&template=02_feature_request.yml&title=feat%3A+">Request a Feature</a>
-
<a href="https://github.com/rootwork/GET/issues/new?assignees=&labels=Type%3A+Question&template=03_support_question.yml&title=support%3A+">Ask a Question</a></strong>

<br />

[![License: MIT](https://img.shields.io/badge/license-%20MIT-blue?style=for-the-badge)](https://github.com/rootwork/GET/blob/main/LICENSE)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=for-the-badge)](https://github.com/rootwork/GET/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc)
[![Coded with love by rootwork](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-rootwork-ff1414.svg?style=for-the-badge)](https://github.com/sponsors/rootwork)

</div>

## ✨ Highlights

- Sass compilation (in SCSS format, so you can use CSS directly if you prefer)
  with autoprefixing, minification and sourcemaps, using modern
  [Dart Sass](https://sass-lang.com/dart-sass).
- Responsive image file and markup generation (`<picture>` sets with `webp` and
  `avif` formats), automatically.
- Modern (2022) HTML5 boilerplate, heavily commented to guide you in your work.
- HTML and Javascript minification.
- Cache-busting of CSS, JS and image assets.
- All the usual Tailwind 3 stuff, including
  [Just-In-Time mode](https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css)
  and
  [CSS purging by default](https://tailwindcss.com/docs/content-configuration#configuring-source-paths).
  (If you weren't around for the history of TailwindCSS, just know that these
  are both Good Things™.) The Tailwind
  [typography plugin](https://tailwindcss.com/docs/typography-plugin) is also
  included.
- Live browser reloading.
- ES6 modules and syntax, so this starter project is easy to extend and adapt as
  you see fit.
- **Bonus:** [Prettier](https://prettier.io/) is integrated and runs on every
  commmit using Husky and Pretty Quick. You can run it on all files at any time
  by using `npm run format`.
- **Bonus:** Optional automatic publishing to GitHub Pages each time you push to
  `main`.
- **Bonus:** Optional accessibility checking with
  [pa11y](https://www.npmjs.com/package/pa11y).

## 🔠 Installation

**Prerequisite: Node v.14.8.0 or above**

1. Clone or fork this project

2. Run `npm install`

## 🚧 Development

`gulp` or `npm start`

After the site is built, your default web browser will open with the index file
and automatically reload whenever project files change. (If you don't want a
browser to open automatically, use `gulp --noop`.)

## 🚚 Production

`gulp --prod` or `npm run prod`

### Cache-busting

On production builds all CSS, JS and image files are renamed by appending random
strings, and references to those files in HTML, JS and CSS files are
automatically rewritten. If you don't need cache-busting, you can turn it off by
setting the `cacheBusting` option in `config.js` to `false`.

### GitHub Actions

A [GitHub build action](.github/workflows/build.yml) will publish your project
to GitHub Pages on every push. We use it to build
[the GET page](https://rootwork.github.io/GET/) itself!

A [GitHub accessibility action](.github/workflows/check_a11y.yml) will check
your project for common a11y issues when you push to your repo. You may want to
replace this with accessibility checking in your build process to ensure issues
are addressed earlier in your development cycle.

There are [other workflows](.github/workflows) with `internal_` prefixes that
are used to manage the GET project itself. These can be safely removed, or you
can use them as templates for your own workflows.

With all workflows, edit or remove the files as necessary to fit your own
project and process!

## 📂 Options and file structure

- [`config.js`](config.js) contains path and project configuration -- edit this
  to suit your needs.
- [`tailwind.config.cjs`](tailwind.config.cjs) contains TailwindCSS
  configuration.
- [`docs`](docs) contains GET's internal documentation. You can remove or change
  these for your own project as you like.
- `src` contains the files you'll be working with:
  - [`src/fonts`](src/fonts) contain local font files; note related
    configuration in `tailwind.config.cjs`.
  - [`src/img`](src/img) contains images which will be minified in builds.
  - [`src/js`](src/js) contains site scripts which will be minified, and
    contains subdirectories for drop-in library scripts and vendor scripts.
  - [`src/root`](src/root) contains files you want copied to the root of your
    build directory, like `robots.txt` or `CNAME`.
  - [`src/styles`](src/styles) contains Sass files that generate minified CSS.

Build processes will generate files in `dist`, which is ignored by git.

### [`.github`](.github)

If you aren't using GitHub for your project development, you can remove this
directory entirely.

If you are using GitHub, you can remove files directly under `.github` (e.g.
[`CODEOWNERS`](.github/CODEOWNERS)), or edit them to align with your own
project.

Within the `workflows` directory, actions that begin with `internal_` are part
of GET's project management, and can be removed if you don't want them to run in
your own GitHub repo.

### [`package.json`](package.json)

You may want to edit the name, description, author, and URLs listed in this file
to match your own project. Run `npm i` to update `package-lock.json` to match.

### Modern image and markup generation

⚠️ This feature is designed for single-page sites with a handful of images. The
markup generation is just regex string replacement, and images that have the
same name but different formats (e.g. `foo.jpg` and `foo.gif`) will clobber each
other. In larger projects, a more efficient and robust templating system would
make much more sense -- for instance see how a Hugo theme I've contributed to
[handles it](https://github.com/chipzoller/hugo-clarity/blob/master/layouts/partials/image-feature.html#L35-L71).

To turn off GET's image and markup generation, set `modernImages` to `false` in
[`config.js`](config.js). Images will still be minified, but alternate formats
and markup will not be created.

### Dark mode

Tailwind provides an option for
[targeting styles for when dark mode is enabled](https://tailwindcss.com/docs/dark-mode)
on a user's system using the `dark:` prefix, and this has been turned on in the
Tailwind configuration.

### Print styles

Tailwind provides an option for
[targeting styles for print-only styles](https://tailwindcss.com/docs/hover-focus-and-other-states#print-styles)
on a user's system using the `print:` prefix, and this has been turned on in the
Tailwind configuration.

### Language direction

Tailwind has
[experimental support for language direction modifiers](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
using `rtl:` and `ltr:` prefixes (only those, at the moment). To help support
this, `dir="ltr"` is already set on the sample HTML file; change as needed to
set the overall language direction for the page.

## Getting support

**[Ask a support question](https://github.com/rootwork/GET/issues/new?assignees=&labels=Type%3A+Question&template=03_support_question.yml&title=support%3A+)**
on GitHub if you're stuck.

## Helping out

- 🌟 Add a GitHub Star to the project.
- Tweet about GET on Twitter).
- Consider [sponsoring rootwork](https://github.com/sponsors/rootwork), GET's
  developer, and have
  [your name or logo included here](#thanks-and-sponsorships)!
- Blog about the project. We love reviews, and are eager to hear ways we could
  make things even better.
- Contribute!

### Contributing

First off, thanks for taking the time to contribute! Contributions are what make
the open-source community such an amazing place to learn, inspire, and create.
Any contributions you make will benefit everybody else and are **greatly
appreciated**.

Please read
[our contribution guidelines](https://github.com/rootwork/GET/blob/main/docs/CONTRIBUTING.md),
and thank you for being involved!

## Security

Legalese: GET is provided **"as is"** without any warranty. Use at your own
risk.

_For more information and to report security issues, please refer to our
[security documentation](https://github.com/rootwork/GET/blob/main/docs/SECURITY.md)._

# Thanks and Sponsorships

<a href="https://www.multietch.com/"><img src="https://raw.githubusercontent.com/rootwork/GET/main/docs/images/multietch.jpg" alt="Multi-Etch" width="75" height="75" align="left"></a>Work
funded in part by <a href="https://www.multietch.com/">Multi-Etch,
LLC</a>.<br />

**Consider [sponsoring rootwork](https://github.com/sponsors/rootwork), GET's
developer, and have your name or logo included here!**

## 📑 Built with

GET originally inspired by https://github.com/stefansdev/creativdepot and
https://github.com/lazymozek/gulp-with-tailwindcss

The big three components are, of course:

- https://github.com/gulpjs/gulp
- https://github.com/babel/babel
- https://github.com/tailwindlabs/tailwindcss

Other projects GET leverages:

- https://github.com/eslint/eslint
- https://github.com/typicode/husky
- https://github.com/prettier/prettier
- https://github.com/azz/pretty-quick
- https://github.com/Browsersync/browser-sync
- https://github.com/lovell/sharp
- https://github.com/khalyomede/gulp-sharp-responsive
- https://github.com/terser/terser
- https://github.com/sass/sass
- https://github.com/postcss/postcss
- https://github.com/postcss/autoprefixer
- https://github.com/gulp-sourcemaps/gulp-sourcemaps
- https://github.com/scniro/gulp-clean-css
- https://github.com/contra/gulp-concat
- https://github.com/jonschlinkert/gulp-htmlmin
- https://github.com/eneko89/cachekill
- https://github.com/robrich/gulp-if
- https://github.com/lazd/gulp-replace
- https://github.com/dec0dOS/amazing-github-template
- https://github.com/yargs/yargs
- https://github.com/sindresorhus/log-symbols

**Thank you open source!**

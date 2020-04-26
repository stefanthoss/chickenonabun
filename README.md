# [Chicken On A Bun](https://chickenonabun.com/)

[![Build Status](https://travis-ci.com/stefanthoss/chickenonabun.com.svg?branch=master)](https://travis-ci.com/stefanthoss/chickenonabun.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/99bf52ae86ded5e3b9f3/maintainability)](https://codeclimate.com/github/stefanthoss/chickenonabun.com/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/99bf52ae86ded5e3b9f3/test_coverage)](https://codeclimate.com/github/stefanthoss/chickenonabun.com/test_coverage)
[![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fchickenonabun.com)](https://validator.nu/?doc=https%3A%2F%2Fchickenonabun.com)
[![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade/chickenonabun.com?publish)](https://observatory.mozilla.org/analyze/chickenonabun.com)

## Adding New Content

Strip new images of EXIF information with:

```shell
mogrify -strip assets/images/original/image.jpg
```

## Local Testing

Test the site locally with drafts:

```shell
jekyll server -w --drafts
```

## Tools

* Emojis: [OpenMoji](https://openmoji.org)
* Favicon generator: [RealFaviconGenerator](https://realfavicongenerator.net)
* Social share buttons: [Simple Sharing Buttons Generator](https://simplesharingbuttons.com)

## License

![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)
![GNU GPLv3](https://www.gnu.org/graphics/gplv3-88x31.png)

The content of this project itself is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International
License](https://creativecommons.org/licenses/by-sa/4.0/), and the underlying source code used to format and display
that content is licensed under the [GNU General Public License v3.0](LICENSE.md).

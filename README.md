# [Chicken On A Bun](https://chickenonabun.com/)

[![GitHub Super-Linter](https://github.com/stefanthoss/chickenonabun.com/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
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

* CSS framework: [Pure.css](https://purecss.io)
* Favicon generator: [RealFaviconGenerator](https://realfavicongenerator.net)
* Geocoding: [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)
* MiniMagick gem: [Jekyll-MiniMagick-new](https://github.com/MattKevan/Jekyll-MiniMagick-new)
* Social share buttons: [Simple Sharing Buttons Generator](https://simplesharingbuttons.com)

## License

The content of [Chicken On A Bun](https://chickenonabun.com/) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

The underlying source code used to format and display that content is licensed under [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.html).

The [chicken emoji](https://openmoji.org/library/#emoji=1F414) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

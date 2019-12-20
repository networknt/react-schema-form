# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

## 0.8.1 - 2019-12-20
### Added

### Changed
- fixes #182 move the webpack-config from dependencies to devDependencies
- fixes #183 rebuilt the example code with webpack
- fixes #184 add README.md to the example folder
- Fixes #185 add support for multi selects. Thanks @naeemba
- fixes #186 resolve a small lint issue

## 0.8.0 - 2019-11-29
### Added

### Changed
- Fix 179 upgrade dependencies to the latest and node 12 is needed 

## 0.7.1 - 2019-09-29
### Added

### Changed
- Fix 175 Fix conditional array. Thanks @ psamim
- Fix 176 fix the security issue reported by npm with npm audit fix

## 0.7.0 - 2019-07-07
### Added

### Changed
- Fix 169 Update to material-ui v4. Thanks @naeemba

## 0.6.15 - 2019-06-18
### Added

### Changed
- Fix 167 Array tuple example/support. Thanks @fauxsoup


## 0.6.13 - 2019-06-03
### Added

### Changed
- Fix 163 Allow htmlClass on fieldset elements. Thanks @fauxsoup

## 0.6.12 - 2019-03-26
### Added

### Changed
- I 160 incorrect errors for not required null fields. Thanks @naeemba

## 0.6.11 - 2019-01-30
### Added

### Changed
- I18 add other props to elements #159. Thanks @naeemba

## 0.6.10 - 2019-01-15
### Added

### Changed
- Fix error message and description on Select #156. Thanks @naeemba

## 0.6.9 - 2019-01-02
### Added

### Changed
- Support objects in selects #153. Thanks @naeemba
- Remove peer dependancy on a fixed version of material-ui #154. Thanks @psamim


## 0.6.8 - 2018-12-31
### Added

### Changed
- Improvements on array component #149. Thanks @naeemba
- Array: fix bug causing nested arrays TextFields loose focus on type #150. Thanks @naeemba
- fix eslint errors #152. Thanks @naeemba

## 0.6.7 - 2018-12-25
### Added
- Render custom labels for required fields #146. Thanks @naeemba

### Changed

## 0.6.6 - 2018-12-23
### Added
- Add support for localization #144. Thanks @naeemba

### Changed
- Validation behaviour on load #136 Thanks @naeemba


## 0.6.5 - 2018-12-18
### Added

### Changed
- Conditionals in array objects #142. Thanks @struankl

## 0.6.4 - 2018-12-13
### Added

### Changed
- fix the help to inject text on form and add an example #141

## 0.6.3 - 2018-12-07
### Added

### Changed
- arrayselect seems not working in the example #121

## 0.6.2 - 2018-11-26
### Added

### Changed
- Updating project dependencies to latest version #135. Thanks @naeemba
- Flow #134. Thanks @naeemba

## 0.6.1 - 2018-11-19
### Added

### Changed
- Fixes Validation Errors not Showing. Thanks @thefringeninja


## 0.6.0 - 2018-10-31
### Added

### Changed
- It is a massive release with latest react and material-ui support. Thanks @JFrankfurt, @dogada, @gtaschuk and @naeemba 

## 0.5.0 - 2018-09-20
### Added

### Changed
- upgrade to react 16.5.1 and material-ui/core 1.5.1(Thanks @dogada and @SadMonster)


## 0.4.1 - 2018-08-06
### Added

### Changed
- fix some issues with 0.4.0 release(Thanks @gtaschuk)

## 0.4.0 - 2018-07-17
### Added

### Changed
- fix number can not empty(Thanks @weilaihui)
- fix Date field can't be cleared issue #77 (Thanks @taitt)
- Merge pull request #79 from weilaihui/master
- Merge pull request #80 from bakaoh/master
- show the clear icon only when there was a value(Thanks @taitt)
- Merge pull request #81 from bakaoh/master
- Simplify canonicalTitleMap processing (Thanks @XaviTorello)
- utils.canonicalTitleMap transpilation (Thanks @XaviTorello)
- Add TextSuggest component (Thanks @XaviTorello)
- Add TextSuggest to schemaForm using "textsuggest" as mapper (Thanks @XaviTorello)
- Ready to work textsuggest component! (Thanks @XaviTorello)
- Add dataSourceConfig to link passed datasource keys (Thanks @XaviTorello)
- Activate openOnFocus (Thanks @XaviTorello)
- Use the generated titleMap as dataSource (Thanks @XaviTorello)
- Intercept changes and pass it to the form handler (Thanks @XaviTorello)
- Clean debug mark (Thanks @XaviTorello)
- Add react-autosuggest dependency for textsuggest fields (Thanks @XaviTorello)
- Add textsuggest autoInit method (Thanks @XaviTorello)
- Add default value if passed to textsuggest (Thanks @XaviTorello)
- Add new TextSuggest field transpilation (Thanks @XaviTorello)
- Add latest SchemaForm transpiled version (Thanks @XaviTorello)
- Identify all SchemaForm fields by an unique key based on their form.key (Thanks @XaviTorello)
- Merge pull request #2 from XaviTorello/fix_fields_identification
- Update transpiled SchemaForm (Thanks @XaviTorello)
- Merge pull request #3 from XaviTorello/fix_fields_identification
- Add notevil dependency (Thanks @XaviTorello)
- Create new util.safeEval method (Thanks @XaviTorello)

## 0.3.11 - 2017-11-03
### Added

### Changed
- Fixes #73 fix Select when param is missing. (Thanks @oceanic815recovery)
- Add `yarn.lock` / Use Yarn for package management (Thanks @MrSaints)

## 0.3.10 - 2017-10-19
### Added

### Changed
- Fixes #71 Fix Select when it is in an array. (Thanks @oceanic815recovery)

## 0.3.9 - 2017-10-18
### Added

### Changed
- Fixes #70 "cannot read property" error when using an enum in an object. (Thanks @MrSaints) 

## 0.3.8 - 2017-07-22
### Added

### Changed
- added floatingLabelType to Date (Thanks @gtaschuk)
- Made FieldSet into a proper fieldset tag with a legend (Thanks @gtaschuk)

## 0.3.7 - 2017-07-18
### Added

### Changed
- Adding top-level className for better framework support (Thanks @curtiswilkinson)

## 0.3.6 - 2017-07-17
### Added

### Changed
- Adding htmlClass from the json-schema-form specification (Thanks @curtiswilkinson)

## 0.3.5 - 2017-06-02
### Added

### Changed
- Sync react and react-dom version

## 0.3.4 - 2017-06-02
### Added

### Changed
- Fixes #45 Number: onChangeValidate called twice (Thanks @stropitek)
- Fixes #44 Move react to peer dependencies, react-dom to dev dependencies (Thanks @stropitek)
 

## 0.3.2 - 2017-01-07
### Added

### Changed
- Fixes #40 number validation (Thanks @maplechori)

## 0.3.1 - 2016-11-06
### Added

### Changed
- Update dependency to react-schema-form-rc-select

## 0.3.0 - 2016-11-03
### Added

### Changed
- Upgrade to react 15.3.2 (Thanks Paul Apostol)
- Upgrade to babel 6.5.2  (Thanks Paul Apostol)
- Upgrade to webpack 1.13.3 (Thanks Paul Apostol)

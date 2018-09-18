# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

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

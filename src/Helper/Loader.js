export default class Loader {
  static loader

  static setLoader = (loader) => {
    this.loader = loader
  }

  static isLoading = (check) => {
    this.loader.showLoader(check)
  }
}

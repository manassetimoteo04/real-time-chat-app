class SearchSuggView {
  _parentElement = document.querySelector(".search-form");
  _searchInput = document.querySelector(".search-friend");

  _handleEvent(handler) {
    this._searchInput?.addEventListener("input", () => {
      handler(this._searchInput.value);
    });
  }
}

export default new SearchSuggView();

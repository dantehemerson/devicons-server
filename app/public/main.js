(function() {
	let searchInput = document.getElementById('searchInput')	
	let searchButton = document.getElementById('searchButton')

	searchInput.focus()
	searchInput.selectionStart = searchInput.selectionEnd = 10000

	function search() {		
		let searchText = searchInput.value
		if(searchText === '') {
			return
		}
		location.href = `/search/${searchText}`					
	}
	
	searchInput.addEventListener('keypress', function(event) {
			if(event.keyCode === 13) {
				search()
			}
	})

	searchButton.addEventListener('click', function() {
		search()
	})

})()
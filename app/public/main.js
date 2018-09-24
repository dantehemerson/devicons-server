(function() {
	let searchInput = document.getElementById('searchInput')

	searchInput.addEventListener('keypress', function(event) {
		let searchText = searchInput.value
		if(event.keyCode === 13) {
			if(searchText === '') {				
				return
			} else {
				location.href = `/search/${searchText}`
			} 			
		}
	})	
})()
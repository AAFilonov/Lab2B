const filter_content = document.querySelectorAll('.content-2  .content-item')




function filterChangeHande(event) {

    if (event.target.checked) {
      
        console.log(event.target.value+' выбран')
	}
	else {
		console.log(event.target.value+' не выбран')
	}
}





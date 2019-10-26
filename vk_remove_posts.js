var observer_body = new MutationObserver(wrapperFunc);
mainFunc()
observer_body.observe(document.body, {childList: true,subtree:true});
function wrapperFunc(){
	// console.log('azaza');
	mainFunc();
}
function mainFunc(){	
	// console.log('ja')
	var initialList = document.getElementById('page_wall_posts');	// список изначальных постов на странице
	if (initialList)
	{
		var observer = new MutationObserver(listModified);	// 
		// список уже был заполнен при подключении расширения - убираем записи животных
		var rows = initialList.children;
		for (var i = 0; i < rows.length; i++)
		{
			// console.log('azaza')
			// console.log(rows[i])
			if (rows[i].classList.contains("post"))
			{
				var author_id = rows[i].children[0].children[0].children[1].children[0].children[0].getAttribute('data-from-id')
				if (author_id == "180198773" ||  author_id == "383170233")
					rows[i].style.display = 'None'
			}
		}

		observer.observe(initialList, {childList: true});	// следим за изменениями в изначальном списке тоже
		var searchlist = document.getElementById('page_search_posts');
		observer.observe(searchlist, {childList: true});	// следим за изменениями в поиске
	}

	// вызывается когда появляются новые посты
	function listModified(mutations)
	{
		console.log('ok')
		for (var i = 0; i < mutations.length; i++)
		{
			var mut = mutations[i];
			if (mut.type != 'childList')
			{
				return;
			}
			// пройдемся по добавленным записям
			// console.log(mut.addedNodes);
			for (var j = 0; j < mut.addedNodes.length; j++)
			{
				// console.log(mut.addedNodes[j]);
				// console.log(mut.addedNodes[j].classList);
				if (mut.addedNodes[j].classList.contains("post"))
				{
					var author_id = mut.addedNodes[j].children[0].children[0].children[1].children[0].children[0].getAttribute('data-from-id');
					// console.log(author_id);
					if (author_id == "180198773" ||  author_id == "383170233")
						mut.addedNodes[j].style.display = 'None'
				}
			}
			// удаленные записи - mut.removedNodes игнорируем
		}
	}


};
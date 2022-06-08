const wrapper = document.getElementById('humens_wrapper')
const humenEdit = document.getElementsByClassName('humen_edit')
const humenIntro = document.getElementsByClassName('humen_intro')
const humenEditIntro = document.getElementsByClassName('humen_edit_intro')
// let humens = []

let preIndex = null
let liStr = ''


const initHtml = () => {
	// <img class="sex_icon" src="./../images/boy.svg"/>
	humens.forEach((item, index) => {
		liStr += 
		`<li class="humen_item">
			<h2 class="humen_name_wrapper">
				<span class="humen_name">${item.name}</span>
				${item.sex ? item.sex === 1 ? `<img class="sex_icon" src="${boy}"/>` : `<img class="sex_icon" src="${girl}"/>` : ''}
			</h2>
			<p class="humen_intro ${item.introduction.includes('离院') ? 'gone' : ''} ${item.introduction.includes('正在想') ? 'none' : ''}" >${item.introduction}</p>
		</li>`
			// <textarea class="humen_edit_intro" maxlength="500" placeholder="请输入你的自我介绍">${item.introduction}</textarea>
			// <a href="javascript:;" class="humen_edit" onclick="editItem(${index})" data-item="${item}">修改</a>
	})
	
	wrapper.innerHTML = liStr
}
initHtml()


const editItem = (index) => {
	if (preIndex !== null) {
		humenEdit[preIndex].innerText = '修改'
		humenIntro[preIndex].classList.remove('none')
		humenEditIntro[preIndex].classList.remove('block')
	}
	humenEdit[index].innerText = '确定'
	humenIntro[index].classList.add('none')
	humenEditIntro[index].classList.add('block')
	preIndex = index
	setTimeout(() => {
		humenEditIntro[index].style.height = humenEditIntro[index].scrollHeight + 'px'
		document.getElementsByClassName('block')[0].addEventListener('input', (e) => {
			humenEditIntro[index].style.height = humenEditIntro[index].scrollHeight + 'px'
		})
	}, 0)
}


// ajax({
// 	url: '/humens',
// 	method: 'get',
// }).then(res => {
// 	console.log("res::: ", res);
// }).catch(err => {
// 	alert('怎么搞得？是你网络的问题还是我的问题？')
// })

// ajax({
// 	url: 'http://10.0.0.40:3000/humens',
// 	method: 'post',
// 	data: humens,
// }).then(res => {
// 	console.log("res::: ", res);
// }).catch(err => {
// 	alert('怎么搞得？是你网络的问题还是我的问题？')
// })

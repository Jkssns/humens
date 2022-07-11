const loading = document.querySelector('.loading_wrapper')
const container = document.querySelector('.humens_container')
const wrapper = document.getElementById('humens_wrapper')
const humenEdit = document.getElementsByClassName('humen_edit')
const humenIntro = document.getElementsByClassName('humen_intro')
const humenEditIntro = document.getElementsByClassName('humen_edit_intro')
const humensTotalWrapper = document.getElementsByClassName('humens_total_wrapper')[0]
const total = document.getElementById('total')
const boy = document.getElementById('boy')
const girl = document.getElementById('girl')
const noSex = document.getElementById('no_sex')
let hasShow = false
let timer = null

// let humens = []
let showCatLoading = window.sessionStorage.getItem('showCatLoading')

if (showCatLoading) {
	loading.style.display = 'none'
	container.style.display = 'flex'
} else {
	let timeout = setTimeout(() => {
		loading.style.display = 'none'
		container.style.display = 'flex'
		clearTimeout(timeout)
		confirm('技术人员正专攻小程序，本列表暂时放弃维护。')
		window.sessionStorage.setItem('showCatLoading', 'true')
	}, 5000)
}

let preIndex = null
let liStr = ''

const initHtml = () => {
	let totalCount = 0, boyCount = 0, girlCount = 0, noSexCount = 0;
	humens.forEach((item, index) => {
		if (index > 2 && item.name && !item.introduction.includes('离院')) {
			totalCount++
			item.sex ? item.sex === 1 ? boyCount++ : girlCount++  : noSexCount++
		}
		liStr += 
		`<li class="humen_item">
			<h2 class="humen_name_wrapper">
				<span class="humen_name">${item.name}</span>
				${item.sex ? item.sex === 1 ? `<img class="sex_icon" src="${boySrc}"/>` : `<img class="sex_icon" src="${girlSrc}"/>` : ''}
			</h2>
			<p class="humen_intro ${item.introduction.includes('离院') ? 'gone' : ''} ${item.introduction.includes('正在想') ? 'none' : ''}" >${item.introduction}</p>
		</li>`
			// <textarea class="humen_edit_intro" maxlength="500" placeholder="请输入你的自我介绍">${item.introduction}</textarea>
			// <a href="javascript:;" class="humen_edit" onclick="editItem(${index})" data-item="${item}">修改</a>
	})
	
	wrapper.innerHTML = liStr

	total.innerText = totalCount
	boy.innerText = boyCount
	girl.innerText = girlCount
	noSex.innerText = noSexCount
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

wrapper.onscroll = (e) => {
	timer && clearTimeout(timer)
	timer = setTimeout(() => {
		if (e.target.scrollTop === 0) {
			hasShow = false
			humensTotalWrapper.classList.remove('shaow')
		} else {
			!hasShow && humensTotalWrapper.classList.add('shaow')
		}
	}, 16)
}

// let a = JSON.stringify(humens.map((item, index) => {
// 	let i = index - 1
// 	return {
// 		...item,
// 		id: i
// 	}
// }))
// console.log("a::: ", a);

// ajax({  
// 	url: '/humens',
// 	method: 'get',
// }).then(res => {
// 	console.log("res::: ", res);
// 	humens = res.data
// 	initHtml()
// }).catch(err => {
// 	console.log("err::: ", err);
// 	alert('你网络有问题，肯定不是技术人员的问题。')
// })

// ajax({
// 	url: '/humens',
// 	method: 'post',
// 	data: humens,
// }).then(res => {
// 	console.log("res::: ", res);
// }).catch(err => {
// 	console.log("err::: ", err);
// 	// alert('怎么搞得？是你网络的问题还是我的问题？')
// })
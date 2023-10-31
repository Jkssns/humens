const baseUrl = 'http://10.0.0.40:3000';

function ajax({ method, url, params, data }) {
	return new Promise((res, rej) => {
		let xhr = new XMLHttpRequest();
		method = method.toLocaleUpperCase()
		if (method === 'GET' ) {
			if (params && Object.keys(params).length) {
				url += '?'
				url += Object.entries(params).map(item => item.join('=')).join('&')
			}
			xhr.open(method, baseUrl + url)
			xhr.send()
		} else if (method === 'POST') {
			xhr.open(method, baseUrl + url)
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.send(JSON.stringify(data))
		}
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status === 200 || xhr.status === 400) {
					res(JSON.parse(xhr.responseText))
				} else {
					rej({message: 'ok', code: 500})
				}
			}
		}
	})
}

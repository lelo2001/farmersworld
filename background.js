// web请求监听
chrome.webRequest.onBeforeRequest.addListener(details => {

	if (details.url.indexOf("chain/get_required_keys") > -1) {

		/*以下为收集的常用的指令，如果需要屏蔽其中某个指令可去掉或用//屏蔽，如需增加某个指令的通过则可像如下加入新的指令，
		  注意：修改脚本后，需重新加载插件才能生效。
		  可以进行测试，如屏蔽修理后，系统将不再发行修理指令
		*/
		var arr = [
			"claim", //收集 如木头
			"mbsclaim", //会员卡收集，如无会员卡 可去掉
			"cropclaim", //植物收集，如大麦
			"anmclaim", //动物收集 如奶牛
			"repair", //修理，
			"recover", //兑换能量
			"withdraw", //兑换代币
			"transfers", //兑换物资，千万不要用transfer这个为转账	
		]


		try {
			var postedString = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details
				.requestBody.raw[0].bytes)));

			var json = JSON.parse(postedString);

			if (json.hasOwnProperty("transaction")) {

				var name = json["transaction"]["actions"][0]["name"];
				var noId = "notify_alert" + Math.round(new Date() / 1000)


				if (arr.indexOf(name) < 0) {
					chrome.notifications.create(
						noId, {
							type: "basic",
							iconUrl: "icon.png",
							title: "危险通知",
							message: CurentTime() + " 有程序对您的钱包产生威胁，系统已阻止，请及时排查危险源。"

						},
						function(result) {

						}


					)

					return {
						cancel: true
					};
				}

			}

		} catch {

			return {
				cancel: true
			};
		}

	}


}, {
	urls: ["<all_urls>"]
}, ["blocking", "requestBody"]);





function CurentTime() {

	var timing = new Date();

	var year = timing.getFullYear(); //年

	var month = timing.getMonth() + 1; //月

	var day = timing.getDate(); //日

	var hour = timing.getHours(); //时

	var min = timing.getMinutes(); //分

	var s = timing.getSeconds(); //秒

	var clock = year + "-";

	if (month < 10)

		clock += "0";

	clock += month + "-";

	if (day < 10)

		clock += "0";

	clock += day + " ";

	if (hour < 10)

		clock += "0";

	clock += hour + ":";

	if (min < 10) clock += '0';

	clock += min + ":";

	if (s < 10) clock += '0';

	clock += s;

	return (clock);

}

export class img {
	_jqImgObj = $("");
	_jqImgID = null;
	_url = "";
	_width = 0;
	_height = 0;
	_outerWidth = 0;
	_outerHeight = 0;

	constructor(jqImgID, url) {
		this._jqImgID = jqImgID;
		this._url = url;
		this.setWidth();
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get outerWidth() {
		return this._outerWidth;
	}

	get outerHeight() {
		return this._outerHeight;
	}

	setImg() {
		let image = new Image();
		image.src = this._url;
		this._width = image.width;
		this._height = image.height;
		this._outerWidth = $(this._imgJqId).outerWidth(true);
		this._outerWidth = $(this._imgJqId).outerWidth(true);
		$(this._imgJqId).attr("src", this._url);
		this._jqImgObj=$(this._jqImgID);
	}

	mouseDown() {
		let that = this;
		this._jqImgObj.on("mousedown",this.ImgProcess())
	}

	mouseUp() {
		let that = this;
		this._jqImgObj.on("mouseup", function () {
			that._jqImgObj.off();
		})
	}

	fingerDown() {

	}

	fingerUp() {

	}

	ImgProcess(){

	}
}

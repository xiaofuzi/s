'use strict';

var _tag = require('../tag.js');

var _ = _interopRequireWildcard(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function html5() {
	return _.doctype() + _.html(_.head(_.meta(), _.title('hello world!')), _.body());
}

console.log(index());

var Point = function Point(x, y) {
	_classCallCheck(this, Point);

	this.x = x;
	this.y = y;
};

var ComplexPoint = function (_Point) {
	_inherits(ComplexPoint, _Point);

	function ComplexPoint(x, y, z) {
		_classCallCheck(this, ComplexPoint);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComplexPoint).call(this, x, y));

		_this.z = z;
		return _this;
	}

	return ComplexPoint;
}(Point);

console.log(new ComplexPoint(1, 2, 3));
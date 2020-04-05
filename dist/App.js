"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const tabris_2 = require("tabris");
const tabris_3 = require("tabris");
const tabris_4 = require("tabris");
const tabris_5 = require("tabris");
const tabris_6 = require("tabris");
const tabris_7 = require("tabris");
const tabris_8 = require("tabris");
const tabris_9 = require("tabris");
const tabris_10 = require("tabris");
const tabris_11 = require("tabris");
const tabris_12 = require("tabris");
const tabris_13 = require("tabris");
const tabris_14 = require("tabris");
const tabris_15 = require("tabris");
const tabris_16 = require("tabris");
const tabris_17 = require("tabris");
const tabris_18 = require("tabris");
const tabris_19 = require("tabris");
const tabris_20 = require("tabris");
tabris_11.navigationBar.displayMode = 'hide';
let activityIndicator = {};
tabris_9.contentView.append(JSX.createElement(tabris_12.NavigationView, { stretch: true },
    JSX.createElement(tabris_1.Action, { placement: 'default', title: '' }),
    JSX.createElement(tabris_13.Page, { title: "Ice'n'Roll Manager", padding: 8, background: '#fafafa' },
        JSX.createElement(tabris_17.ScrollView, { top: 0, bottom: 0, stretchX: true },
            JSX.createElement(tabris_8.Composite, { stretchX: true, left: true, right: '50%', height: 150, padding: 5, elevation: 4 },
                JSX.createElement(tabris_8.Composite, { stretch: true, highlightOnTouch: true, background: '#fff', onTap: orderManager, cornerRadius: 24, padding: 20 },
                    JSX.createElement(tabris_10.ImageView, { center: true, image: 'resources/icons8-shopping-cart-50-blue.png', onTap: orderManager }),
                    JSX.createElement(tabris_20.TextView, { centerX: true, top: 'prev()' }, "Zam\u00F3wienia"))),
            JSX.createElement(tabris_8.Composite, { stretchX: true, left: '50%', right: 0, height: 150, padding: 5 },
                JSX.createElement(tabris_8.Composite, { stretch: true, highlightOnTouch: true, background: '#fff', cornerRadius: 24, padding: 20, onTap: deliveryManager },
                    JSX.createElement(tabris_10.ImageView, { center: true, image: 'resources/icons8-truck-50-blue.png', onTap: deliveryManager }),
                    JSX.createElement(tabris_20.TextView, { centerX: true, top: 'prev()' }, "Dostawa"))),
            JSX.createElement(tabris_8.Composite, { top: 'prev()', stretchX: true, left: true, right: '50%', height: 150, padding: 5 },
                JSX.createElement(tabris_8.Composite, { stretch: true, highlightOnTouch: true, background: '#fff', onTap: menuManager, cornerRadius: 24, padding: 20 },
                    JSX.createElement(tabris_10.ImageView, { center: true, image: 'resources/icons8-restaurant-menu-50-blue.png', onTap: menuManager }),
                    JSX.createElement(tabris_20.TextView, { centerX: true, top: 'prev()' }, "Menu"))),
            JSX.createElement(tabris_8.Composite, { top: 150, stretchX: true, left: '50%', right: 0, height: 150, padding: 5 },
                JSX.createElement(tabris_8.Composite, { stretch: true, highlightOnTouch: true, background: '#fff', onTap: productManager, cornerRadius: 24, padding: 20 },
                    JSX.createElement(tabris_10.ImageView, { center: true, image: 'resources/icons8-grocery-store-50-blue.png', onTap: productManager }),
                    JSX.createElement(tabris_20.TextView, { centerX: true, top: 'prev()' }, "Magazyn")))))));
/*
new esmaps.Map({
  left: 0, right: 0, top: 0, bottom: 0
}).on('ready', function() {
  // show paris with a radius of 2000 meters
  this.moveToPosition([48.8644458, 2.3589976], 2000);
}).appendTo(tabris.ui.contentView);
*/
// START print test
/*
new Button({
  left: 16, right: 16, top: 16,
  text: 'Print PDF'
}).onSelect(() => print('resources/powtórzenie_nr_6.pdf', 'application/pdf', 'Example PDF'))
  .appendTo(contentView);

new Button({
  left: 16, right: 16, top: 'prev() 16',
  text: 'Print Image'
}).onSelect(() => print('resources/salad.jpg', 'image/jpg', 'Salad image'))
  .appendTo(contentView);

function print(file, contentType, jobName) {
  fetch(app.getResourceLocation(file))
    .then(res => res.arrayBuffer())
    .then(data => printer.print(data, {jobName, contentType}))
    .then(event => console.log('Printing finished', event))
    .catch(err => console.error(err));
}
*/
// END OF print test
var address = {};
var mapAddress = {};
var check = {};
var deliveryNum = 0;
function showTextInputDialog() {
    return __awaiter(this, void 0, void 0, function* () {
        const dialog = tabris_4.AlertDialog.open(JSX.createElement(tabris_4.AlertDialog, { title: 'Logowanie', buttons: { ok: 'Zaloguj' } },
            "Podaj swoje imi\u0119, aby zalogowa\u0107 si\u0119 do Ice'n'Roll Manager.",
            JSX.createElement(tabris_19.TextInput, { message: 'Username' })));
        const { texts, button } = yield dialog.onClose.promise();
        if (button === 'ok') {
            localStorage.setItem('inr_mgr_username', texts);
        }
        $(tabris_1.Action).only().title = texts;
    });
}
if (localStorage.getItem('inr_mgr_username') === null)
    showTextInputDialog();
else
    $(tabris_1.Action).only().title = localStorage.getItem('inr_mgr_username');
const navigationView = $(tabris_12.NavigationView).only();
const IMG_CLOSE = device.platform === 'iOS' ? 'resources/icons8-close-window-24-white.png' : 'resources/outline_close_white_24dpx1.png';
let stackView = {};
var products = {};
let orders = {};
let refreshComposite = {};
function deliveryManager() {
    return __awaiter(this, void 0, void 0, function* () {
        navigationView.append(JSX.createElement(tabris_13.Page, { title: 'Plan dostawy', background: '#F4F8FB' },
            JSX.createElement(tabris_2.ActivityIndicator, { layoutData: 'center' }),
            JSX.createElement(tabris_17.ScrollView, { top: 0, bottom: 0, stretchX: true },
                JSX.createElement(tabris_8.Composite, { id: 'mainList', top: 20, left: 15, right: 15, height: 64, cornerRadius: 16, background: '#fff', elevation: 8 },
                    JSX.createElement(tabris_17.ScrollView, { stretchX: true, top: 'prev()', bottom: 'next()' },
                        JSX.createElement(tabris_18.Stack, { id: 'productStack', stretchX: true }))),
                JSX.createElement(tabris_8.Composite, { top: 'prev() 20', stretchX: true, height: 100 },
                    JSX.createElement(tabris_5.Button, { center: true, padding: [16, 32, 16, 32], onSelect: routePlan }, "Zaplanuj tras\u0119")))));
        let activityIndicator = $(tabris_2.ActivityIndicator).only();
        stackView = $(tabris_18.Stack).only();
        activityIndicator.visible = true;
        const response = yield fetch('https://icenroll.pl/freezer/ajax/get-orders-shipping/', { method: 'POST' });
        const data = yield response.json();
        let orders = data;
        deliveryNum = orders.length;
        //  logDisplay(orders.length);
        const elementHeight = (orders.length) * 65;
        $(tabris_8.Composite).only('#mainList').height = elementHeight;
        for (var i = 0; i < orders.length; i++) {
            const idx = orders[i].order_id;
            if (orders[i].address_2 === '')
                address[i] = orders[i].address_1 + '+' + orders[i].postcode + '+' + orders[i].city;
            else
                address[i] = orders[i].address_1 + '+' + orders[i].address_2 + '+' + orders[i].postcode + '+' + orders[i].city;
            address[i] = address[i].replace(' ', '+');
            check[i] = 0;
            const checkBoxId = 'checkBox-' + i;
            stackView.append(JSX.createElement(tabris_8.Composite, { id: 'parentC', stretchX: true },
                JSX.createElement(tabris_8.Composite, { padding: 16, height: 64, stretchX: true, centerY: true, highlightOnTouch: true, onTap: ev => showOrderPopover(ev, idx) },
                    JSX.createElement(tabris_20.TextView, { id: 'total', centerY: true, left: 6, right: 'next() 20' },
                        "#",
                        orders[i].order_id),
                    JSX.createElement(tabris_20.TextView, { id: 'address', centerY: true, left: '25%', right: 'next()' },
                        orders[i].address_1,
                        " ",
                        orders[i].address_2),
                    JSX.createElement(tabris_6.CheckBox, { id: checkBoxId, right: 20 })),
                JSX.createElement(tabris_8.Composite, { stretchX: true, height: 1, background: '#e0e0e0' })));
        }
        activityIndicator.visible = false;
    });
}
function routePlan() {
    return __awaiter(this, void 0, void 0, function* () {
        var mapPoints = '/Current+Location';
        for (var i = 0; i < deliveryNum; i++) {
            const checkBoxId = '#checkBox-' + i;
            if ($(tabris_6.CheckBox).only('#checkBox-' + i).checked) {
                var addr;
                if (address[i].search('/') >= 0)
                    addr = '/' + address[i].substr(0, address[i].search('/'));
                else
                    addr = '/' + address[i];
                mapPoints += addr;
            }
        }
        const googleMapsURL = encodeURI(mapPoints);
        let maps = device.platform === 'iOS' ? 'maps' : 'https';
        maps = maps + '://www.google.com/maps/dir/' + googleMapsURL;
        try {
            yield tabris_3.app.launch(maps);
        }
        catch (ex) {
            logDisplay(ex.message);
        }
    });
}
function orderManager() {
    return __awaiter(this, void 0, void 0, function* () {
        navigationView.append(JSX.createElement(tabris_13.Page, { title: 'Zam\u00F3wienia' },
            JSX.createElement(tabris_2.ActivityIndicator, { layoutData: 'center' }),
            JSX.createElement(tabris_16.RefreshComposite, { stretch: true, refreshEnabled: true, onRefresh: handleRefresh },
                JSX.createElement(tabris_8.Composite, { stretchX: true, top: 0, bottom: 0 },
                    JSX.createElement(tabris_8.Composite, { id: 'parentC', stretchX: true, background: '#71BCF2', padding: [0, 16, 0, 16] },
                        JSX.createElement(tabris_8.Composite, { height: 48, stretchX: true, centerY: true },
                            JSX.createElement(tabris_20.TextView, { id: 'date', centerY: true, left: 0, textColor: '#fff', font: '16px' }, "Data"),
                            JSX.createElement(tabris_20.TextView, { id: 'quantity', centerY: true, left: '23%', right: 'next()', alignment: 'centerX', textColor: '#fff', font: '16px' }, "Ilo\u015B\u0107"),
                            JSX.createElement(tabris_20.TextView, { id: 'total', centerY: true, left: '34%', right: 'next() 10', alignment: 'right', textColor: '#fff', font: '16px' }, "# Zam"),
                            JSX.createElement(tabris_20.TextView, { id: 'status', centerY: true, left: '56%', right: 'next()', alignment: 'centerX', textColor: '#fff', font: '16px' }, "Status"),
                            JSX.createElement(tabris_20.TextView, { id: 'handler', centerY: true, left: '82%', width: 60, alignment: 'centerX', textColor: '#fff', font: '16px' }, "Opiekun"))),
                    JSX.createElement(tabris_8.Composite, { stretchX: true, top: 'prev()', height: 2, background: '#e0e0e0' }),
                    JSX.createElement(tabris_17.ScrollView, { stretchX: true, top: 'prev()', bottom: 'next()' },
                        JSX.createElement(tabris_18.Stack, { id: 'productStack', stretchX: true }))))));
        refreshComposite = $(tabris_16.RefreshComposite).only();
        let activityIndicator = $(tabris_2.ActivityIndicator).only();
        stackView = $(tabris_18.Stack).only();
        activityIndicator.visible = true;
        const response = yield fetch('https://icenroll.pl/freezer/ajax/get-orders/', { method: 'POST' });
        const data = yield response.json();
        let orders = data;
        let fontWeight = '';
        for (var i = 0; i < orders.length; i++) {
            const idx = orders[i].order_id;
            let color = "#000";
            if (orders[i].handler === '') {
                fontWeight = 'bold 14px';
                color = '#000';
                if (orders[i].order_status === 'Zakończone')
                    color = '#A0A0A0';
                if (orders[i].order_status === 'Anulowane')
                    color = '#C6C6C6';
            }
            else
                fontWeight = '';
            stackView.append(JSX.createElement(tabris_8.Composite, { id: 'parentC', stretchX: true, padding: [0, 16, 0, 16] },
                JSX.createElement(tabris_8.Composite, { height: 64, stretchX: true, centerY: true, highlightOnTouch: true, onTap: ev => showOrderPopover(ev, idx) },
                    JSX.createElement(tabris_20.TextView, { id: 'date', centerY: true, left: 0, right: 'next()', textColor: color, font: fontWeight }, orders[i].order_modified),
                    JSX.createElement(tabris_20.TextView, { id: 'quantity', centerY: true, left: '26%', right: 'next()', alignment: 'centerX', textColor: color, font: fontWeight }, orders[i].item_cnt),
                    JSX.createElement(tabris_20.TextView, { id: 'total', centerY: true, left: '32%', right: 'next() 20', alignment: 'right', textColor: color, font: fontWeight },
                        "#",
                        orders[i].order_id),
                    JSX.createElement(tabris_20.TextView, { id: 'status', centerY: true, left: '57%', right: 'next()', alignment: 'centerX', textColor: color, font: fontWeight }, truncate(orders[i].order_status, 14)),
                    JSX.createElement(tabris_20.TextView, { id: 'handler', centerY: true, left: '84%', right: 0, alignment: 'right', textColor: color, font: fontWeight }, orders[i].handler)),
                JSX.createElement(tabris_8.Composite, { stretchX: true, height: 1, background: '#e0e0e0' })));
        }
        activityIndicator.visible = false;
    });
}
function handleRefresh() {
    return __awaiter(this, void 0, void 0, function* () {
        navigationView.pages().last().dispose();
        orderManager();
    });
}
function truncate(input, limit) {
    if (input.length > (limit - 3))
        return input.substring(0, limit - 3) + '...';
    else
        return input;
}
;
function showOrderPopover(event, order_id) {
    return __awaiter(this, void 0, void 0, function* () {
        tabris_11.navigationBar.displayMode = 'hide';
        const formData = new FormData();
        formData.set('id', order_id);
        formData.set('handler', localStorage.getItem('inr_mgr_username'));
        const result = yield fetch('https://icenroll.pl/freezer/ajax/get-order-details/', { method: 'POST', body: formData });
        const data = yield result.json();
        const title = 'Zamówienie #' + order_id;
        let address_2 = data.address_2;
        if (address_2 !== '')
            address_2 = '<br>' + address_2;
        const googleMapsURL = encodeURI('&query=' + data.address_1 + ' ' + data.address_2 + ',' + data.postcode + ',' + data.city);
        const statusItems = ['Do dowiezienia', 'Dostarczone', 'Odbiór osobisty'];
        let idx = 0;
        switch (data.order_status) {
            case 'Dostawa':
                idx = 0;
                break;
            case 'Zakończone':
                idx = 1;
                break;
            case 'Do odbioru':
                idx = 2;
                break;
            default:
                idx = 0;
        }
        const StatusPicker = attributes => JSX.createElement(tabris_14.Picker, Object.assign({ itemCount: statusItems.length, itemText: index => statusItems[index] }, attributes, { selectionIndex: idx }));
        const itemsScrollHeight = (data.items.length + 2) * 44;
        const popover = tabris_15.Popover.open(JSX.createElement(tabris_15.Popover, { width: 300, height: 600 },
            JSX.createElement(tabris_12.NavigationView, { stretch: true },
                JSX.createElement(tabris_1.Action, { placement: 'navigation', title: 'Close', image: IMG_CLOSE, onSelect: () => popover.close() }),
                JSX.createElement(tabris_13.Page, { title: title, top: 'prev() 200', background: '#F4F8FB' },
                    JSX.createElement(tabris_17.ScrollView, { id: 'orderScroll', top: 0, bottom: 0, stretchX: true },
                        JSX.createElement(tabris_8.Composite, { stretchX: true, padding: 16, top: 20, left: 20, right: 20, height: 160, background: '#fff', elevation: 4, cornerRadius: 6, onTap: ev => launchMaps(ev, googleMapsURL) },
                            JSX.createElement(tabris_20.TextView, { alignment: 'left', top: 'prev() 3', font: 'bold 14px' },
                                data.first_name,
                                " ",
                                data.last_name),
                            JSX.createElement(tabris_20.TextView, { alignment: 'left', top: 'prev() 3', markupEnabled: true, lineSpacing: 1.2 },
                                data.address_1,
                                address_2),
                            JSX.createElement(tabris_20.TextView, { alignment: 'left', top: 'prev() 3' },
                                data.postcode,
                                ", ",
                                data.city),
                            JSX.createElement(tabris_20.TextView, { alignment: 'right', bottom: 5, right: 35, font: 'bold 16px', stretchX: true, textColor: '#a8a8a8' }, "Adres dostawy"),
                            JSX.createElement(tabris_10.ImageView, { image: 'resources/icons8-ok-30.png', bottom: 0, right: 0 }),
                            JSX.createElement(tabris_10.ImageView, { image: 'resources/icons8-google-maps-48.png', top: 0, right: 0, onTap: ev => launchMaps(ev, googleMapsURL) })),
                        JSX.createElement(tabris_8.Composite, { stretchX: true, padding: 16, top: 'prev() 20', left: 20, right: 20, height: 90, background: '#fff', elevation: 4, cornerRadius: 6, onTap: ev => callNum(ev, data.phone) },
                            JSX.createElement(tabris_10.ImageView, { image: 'resources/icons8-email-20.png', left: 0 }),
                            JSX.createElement(tabris_20.TextView, { alignment: 'left', top: 0, left: 'prev() 5' }, data.email),
                            JSX.createElement(tabris_10.ImageView, { image: 'resources/icons8-phone-20-glyph.png', top: 'prev() 15', left: 0, onTap: ev => callNum(ev, data.phone) }),
                            JSX.createElement(tabris_20.TextView, { alignment: 'left', left: '25', top: 35, onTap: ev => callNum(ev, data.phone) }, data.phone),
                            JSX.createElement(tabris_20.TextView, { alignment: 'right', bottom: 3, right: 35, font: 'bold 16px', stretchX: true, textColor: '#a8a8a8' }, "Kontakt"),
                            JSX.createElement(tabris_10.ImageView, { image: 'resources/icons8-ok-30.png', bottom: 0, right: 0 })),
                        JSX.createElement(tabris_8.Composite, { height: itemsScrollHeight, stretchX: true, top: 'prev()' },
                            JSX.createElement(tabris_20.TextView, { top: 'prev()', padding: [20, 25, 0, 25], font: 'bold 16px' }, "Podsumowanie zam\u00F3wienia"),
                            JSX.createElement(tabris_7.CollectionView, { id: 'colView', top: 'prev()', padding: 10, stretch: true, itemCount: data.items.length, cellHeight: 48, createCell: createItemCell, updateCell: updateItemCell })),
                        JSX.createElement(tabris_8.Composite, { top: 'prev()', padding: [10, 20, 20, 20], left: true, stretchX: true },
                            JSX.createElement(StatusPicker, { id: 'statusPicker', left: true, stretchX: true, style: 'outline', message: 'Status', background: '#fff', elevation: 2, onSelect: ev => statusChange(ev, ev.index) })))))));
        function statusChange(event, index) {
            return __awaiter(this, void 0, void 0, function* () {
                const statusItems = ['Do dowiezienia', 'Dostarczone', 'Odbiór osobisty'];
                const dialog = tabris_4.AlertDialog.open(JSX.createElement(tabris_4.AlertDialog, { title: 'Zmiana statusu', buttons: { ok: 'Zmień', cancel: 'Anuluj' } },
                    "Zmieni\u0107 status zam\u00F3wienia na \"",
                    statusItems[index],
                    "\"?"));
                const { texts, button } = yield dialog.onClose.promise();
                if (button === 'ok') {
                    activityIndicator.visible = true;
                    const formData = new FormData();
                    formData.set('order_id', order_id);
                    formData.set('status', statusItems[index]);
                    const result = yield fetch('https://icenroll.pl/freezer/ajax/set-order-status/', { method: 'POST', body: formData });
                    const data = yield result.json();
                    popover.close();
                    handleRefresh();
                }
                else {
                    event.target.selectionIndex = idx;
                }
            });
        }
        const itemsOrder = $(tabris_18.Stack).only();
        tabris_11.navigationBar.displayMode = 'hide';
        function createItemCell() {
            return (JSX.createElement(tabris_8.Composite, { id: 'parentC', stretchX: true, padding: [0, 5, 0, 5] },
                JSX.createElement(tabris_8.Composite, { height: 40, stretchX: true, centerY: true, padding: [10, 10, 10, 10] },
                    JSX.createElement(tabris_20.TextView, { id: 'productName', centerY: true, left: 0, right: '10%' }),
                    JSX.createElement(tabris_20.TextView, { id: 'productQty', centerY: true, right: 5, width: 30, alignment: 'centerX' })),
                JSX.createElement(tabris_8.Composite, { stretchX: true, height: 3, background: '#fff', elevation: 1 })));
        }
        function updateItemCell(cell, index) {
            cell.find(tabris_20.TextView).only('#productName').text = data.items[index].product_name;
            cell.find(tabris_20.TextView).only('#productQty').text = data.items[index].item_qty;
        }
    });
}
function callNum(event, num) {
    return __awaiter(this, void 0, void 0, function* () {
        const numberCall = 'tel:' + num;
        try {
            yield tabris_3.app.launch(numberCall);
        }
        catch (ex) {
            logDisplay(ex.message);
        }
    });
}
function launchMaps(event, url) {
    return __awaiter(this, void 0, void 0, function* () {
        let maps = device.platform === 'iOS' ? 'maps' : 'https';
        maps = maps + '://www.google.com/maps/search/?api=1' + url;
        try {
            yield tabris_3.app.launch(maps);
        }
        catch (ex) {
            logDisplay(ex.message);
        }
    });
}
function showNavBar() {
    tabris_11.navigationBar.displayMode = 'hide';
}
//sendNotification("Nowe zamówienie", "Wpłyneło nowe zamówienie online.");
function sendNotification(title, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new FormData();
        formData.set('id', 'FjoEmpnBc');
        formData.set('type', 'Icenroll');
        formData.set('title', title);
        formData.set('message', message);
        formData.set('image_url', 'https://icenroll.pl/img/icons8-mobile-order-64.png');
        const result = yield fetch('https://wirepusher.com/send', { method: 'POST', body: formData });
        const data = yield result.json();
    });
}
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://icenroll.pl/freezer/ajax/get-products/', { method: 'POST' });
        const data = yield response.json();
        products = data;
        logDisplay(data.length);
        return products;
    });
}
function productManager() {
    return __awaiter(this, void 0, void 0, function* () {
        navigationView.append(JSX.createElement(tabris_13.Page, { title: 'Sklep' },
            JSX.createElement(tabris_2.ActivityIndicator, { layoutData: 'center' }),
            JSX.createElement(tabris_8.Composite, { stretchX: true, top: 10, left: 10, right: 10, height: 100, background: '#fff', elevation: 4, cornerRadius: 6 },
                JSX.createElement(tabris_8.Composite, { left: true, right: '40%', stretchX: true, centerY: true },
                    JSX.createElement(tabris_20.TextView, { top: 'prev() 5', alignment: 'right', font: '16px', stretchX: true }, "Smak\u00F3w w sklepie:"),
                    JSX.createElement(tabris_20.TextView, { top: 'prev() 5', alignment: 'right', font: '16px', stretchX: true }, "Opakowa\u0144 w sklepie:")),
                JSX.createElement(tabris_8.Composite, { left: '60%', right: 0, centerY: true },
                    JSX.createElement(tabris_20.TextView, { id: 'totalProducts', top: 'prev() 7', left: 5, font: '16px' }),
                    JSX.createElement(tabris_20.TextView, { id: 'totalItems', top: 'prev() 5', left: 5, font: '16px' })),
                JSX.createElement(tabris_8.Composite, { height: 1, stretchX: true, bottom: 'next()', background: '#D0D0D0' })),
            JSX.createElement(tabris_8.Composite, { stretchX: true, top: 'prev()', bottom: 0 },
                JSX.createElement(tabris_17.ScrollView, { stretchX: true, top: 0, bottom: 'next()' },
                    JSX.createElement(tabris_18.Stack, { id: 'productStack', stretchX: true })))));
        const activityIndicator = $(tabris_2.ActivityIndicator).only();
        stackView = $(tabris_18.Stack).only();
        activityIndicator.visible = true;
        const response = yield fetch('https://icenroll.pl/freezer/ajax/get-products/', { method: 'POST' });
        const data = yield response.json();
        products = data;
        var bg, minusImg, tintColor, cnt = 0, totalCnt = 0;
        for (var i = 0; i < products.length; i++) {
            const idx = products[i].flavour_id;
            if (products[i].quantity == null)
                products[i].quantity = 0;
            if (parseInt(products[i].quantity) > 0) {
                bg = '#fff';
                tintColor = 'initial';
                cnt++;
                totalCnt += parseInt(products[i].quantity);
            }
            else {
                bg = '#F2F2F2';
                tintColor = '#ccc';
            }
            stackView.append(JSX.createElement(tabris_8.Composite, { id: 'parentC', stretchX: true, padding: [0, 16, 0, 16], background: bg },
                JSX.createElement(tabris_8.Composite, { height: 64, stretchX: true, centerY: true },
                    JSX.createElement(tabris_20.TextView, { id: 'flavourName', centerY: true, left: 0, right: '40%' }, products[i].flavour_name),
                    JSX.createElement(tabris_20.TextView, { id: 'quantity', centerY: true, right: 50, width: 30, alignment: 'centerX' }, products[i].quantity),
                    JSX.createElement(tabris_10.ImageView, { id: 'imgMinus', centerY: true, image: 'resources/icons8-minus-40.png', right: 80, onTap: ev => decreaseQuantity(ev, idx, i), tintColor: tintColor }),
                    JSX.createElement(tabris_10.ImageView, { centerY: true, image: 'resources/icons8-plus-40.png', right: 10, onTap: ev => increaseQuantity(ev, idx, i) })),
                JSX.createElement(tabris_8.Composite, { stretchX: true, height: 1, background: '#e0e0e0' })));
        }
        activityIndicator.visible = false;
        $(tabris_20.TextView).only('#totalProducts').text = cnt;
        $(tabris_20.TextView).only('#totalItems').text = totalCnt;
    });
}
function decreaseQuantity(event, idx, i) {
    return __awaiter(this, void 0, void 0, function* () {
        if (event.target.parent(tabris_8.Composite).find(tabris_10.ImageView).only('#imgMinus').tintColor != 'initial') {
            return;
        }
        const flavourName = event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#flavourName').text;
        var qty = parseInt(event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#quantity').text) - 1;
        event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#quantity').text = qty;
        let totalCnt = parseInt($(tabris_20.TextView).only('#totalItems').text) - 1;
        $(tabris_20.TextView).only('#totalItems').text = totalCnt;
        if (qty == 0) {
            event.target.parent(tabris_8.Composite).find(tabris_10.ImageView).only('#imgMinus').tintColor = '#ccc';
            event.target.parent('#parentC').background = '#F2F2F2';
            $(tabris_20.TextView).only('#totalProducts').text = parseInt($(tabris_20.TextView).only('#totalProducts').text) - 1;
        }
        qty = -1;
        const formData = new FormData();
        formData.set('product_id', idx);
        formData.set('product_quantity', qty);
        const result = yield fetch('https://icenroll.pl/freezer/ajax/set-quantity/', { method: 'POST', body: formData });
        const data = yield result.json();
    });
}
function increaseQuantity(event, idx, i) {
    return __awaiter(this, void 0, void 0, function* () {
        const flavourName = event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#flavourName').text;
        const prevQty = parseInt(event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#quantity').text);
        if (prevQty == 0) {
            var newQty = parseInt($(tabris_20.TextView).only('#totalProducts').text) + 1;
            $(tabris_20.TextView).only('#totalProducts').text = newQty;
        }
        let totalCnt = parseInt($(tabris_20.TextView).only('#totalItems').text) + 1;
        $(tabris_20.TextView).only('#totalItems').text = totalCnt;
        var qty = parseInt(event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#quantity').text) + 1;
        event.target.parent(tabris_8.Composite).find(tabris_20.TextView).only('#quantity').text = qty;
        if (qty > 0) {
            event.target.parent(tabris_8.Composite).find(tabris_10.ImageView).only('#imgMinus').tintColor = 'initial';
            event.target.parent('#parentC').background = '#fff';
        }
        qty = 1;
        const formData = new FormData();
        formData.set('product_id', idx);
        formData.set('product_quantity', qty);
        const result = yield fetch('https://icenroll.pl/freezer/ajax/set-quantity/', { method: 'POST', body: formData });
        const data = yield result.json();
    });
}
var flavours = {};
//getFlavours();
function getFlavours() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://icenroll.pl/freezer/ajax/get-flavours/', { method: 'POST' });
        const data = yield response.json();
        flavours = {};
        flavours = data;
        return flavours;
    });
}
//<Composite stretchX top height={64} background='#eaeaea' padding={5}>
function menuManager() {
    return __awaiter(this, void 0, void 0, function* () {
        navigationView.append(JSX.createElement(tabris_13.Page, { title: 'Menu' },
            JSX.createElement(tabris_2.ActivityIndicator, { layoutData: 'center' }),
            JSX.createElement(tabris_8.Composite, { stretchX: true, top: 15, left: 15, right: 15, height: 68, background: '#fff', elevation: 4, cornerRadius: 6 },
                JSX.createElement(tabris_8.Composite, { left: true, right: '40%', stretchX: true, centerY: true },
                    JSX.createElement(tabris_20.TextView, { alignment: 'right', font: '16px', stretchX: true }, "Smak\u00F3w w witrynie:")),
                JSX.createElement(tabris_8.Composite, { left: '60%', right: 0, centerY: true },
                    JSX.createElement(tabris_20.TextView, { id: 'totalMenu', left: 5, font: '16px' }))),
            JSX.createElement(tabris_8.Composite, { stretchX: true, top: 'prev()', bottom: 0 },
                JSX.createElement(tabris_17.ScrollView, { stretchX: true, top: 0, bottom: 'next()' },
                    JSX.createElement(tabris_18.Stack, { id: 'menuStack', stretchX: true })))));
        const activityIndicator = $(tabris_2.ActivityIndicator).only();
        activityIndicator.visible = true;
        const response = yield fetch('https://icenroll.pl/freezer/ajax/get-flavours/', { method: 'POST' });
        const data = yield response.json();
        flavours = data;
        stackView = $(tabris_18.Stack).only();
        var bg, col;
        var cnt = 0;
        for (var i = 0; i < flavours.length; i++) {
            const idx = i;
            if (parseInt(flavours[i].in_menu) == 1) {
                bg = '#0071DB';
                col = '#fff';
                cnt++;
            }
            else {
                bg = '#fff';
                col = '#0071DB';
            }
            stackView.append(JSX.createElement(tabris_8.Composite, { stretchX: true, padding: [0, 16, 0, 16] },
                JSX.createElement(tabris_8.Composite, { height: 50, background: bg, padding: [6, 16, 6, 16], highlightOnTouch: true, stretchX: true, cornerRadius: 9, onTap: ev => toggleFlavour(ev, idx) },
                    JSX.createElement(tabris_20.TextView, { id: flavours[i].flavour_id, centerY: true, left: 0, textColor: col }, flavours[i].flavour_name)),
                JSX.createElement(tabris_8.Composite, { stretchX: true, height: 1, background: '#eeeeee', elevation: 1 })));
        }
        activityIndicator.visible = false;
        $(tabris_20.TextView).only('#totalMenu').text = cnt;
    });
}
function toggleFlavour(event, idx) {
    const flavourName = event.target.find(tabris_20.TextView).only().text;
    const bg = event.target.background;
    var total = parseInt($(tabris_20.TextView).only('#totalMenu').text);
    //  logDisplay(flavourName + ' ' + idx);
    //  logDisplay(bg);
    if (bg == 'rgb(0, 113, 219)') {
        event.target.background = '#fff';
        event.target.find(tabris_20.TextView).only().textColor = bg;
        flavours[idx].in_menu = '0';
        total--;
    }
    else {
        event.target.background = '#0071DB';
        event.target.find(tabris_20.TextView).only().textColor = '#fff';
        flavours[idx].in_menu = '1';
        total++;
    }
    $(tabris_20.TextView).only('#totalMenu').text = total;
    menuSave();
}
function menuSave() {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new FormData();
        var cnt = 0;
        for (var i = 0; i < flavours.length; i++) {
            if (parseInt(flavours[i].in_menu) == 1) {
                formData.set('id-' + cnt, flavours[i].flavour_id);
                cnt++;
            }
            // SELECT * FROM menu WHERE MENU_ITEM_FLAVOUR_ID NOT IN (810, 813, 1296, 812, 838, 839, 1321, 1294, 1314)
            // ID = 813, 813 = MASCARPONE
        }
        if (cnt === 0) {
            logDisplay('cent = 0');
            formData.set('id-0', 'del-all');
        }
        const result = yield fetch('https://icenroll.pl/freezer/ajax/set-menu/', { method: 'POST', body: formData });
        const data = yield result.json();
        logDisplay(data.response);
    });
}
function createCell() {
    return (JSX.createElement(tabris_8.Composite, null,
        JSX.createElement(tabris_8.Composite, { id: 'container', stretch: true, background: 'white', highlightOnTouch: true, onTap: toggleFlavour },
            JSX.createElement(tabris_20.TextView, { centerY: true, id: 'flavourName', left: 16 })),
        JSX.createElement(tabris_8.Composite, { stretchX: true, height: 2, background: '#eeeeee' })));
}
function updateCell(cell, index) {
    const flavour = flavours[index];
    cell.find(tabris_20.TextView).only('#flavourName').text = flavour.flavour_name;
    cell.find(tabris_8.Composite).only('#container').data.flavour_id = flavour.flavour_id;
    cell.find(tabris_8.Composite).only('#container').data.in_menu = flavour.in_menu;
    cell.find(tabris_8.Composite).only('#container').data.index = index;
    if (parseInt(flavour.in_menu) == 1) {
        cell.find(tabris_8.Composite).only('#container').background = '#0071DB';
        cell.find(tabris_20.TextView).only('#flavourName').textColor = '#fff';
        cell.find(tabris_8.Composite).only('#container').data.in_menu = '0';
    }
    else {
        cell.find(tabris_8.Composite).only('#container').background = '#fff';
        cell.find(tabris_20.TextView).only('#flavourName').textColor = '#0071DB';
        cell.find(tabris_8.Composite).only('#container').data.in_menu = '1';
    }
}
function logDisplay(message) {
    tabris_4.AlertDialog.open(JSX.createElement(tabris_4.AlertDialog, { title: 'Log', message: message, buttons: { ok: 'OK' } }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBQzlCLG1DQUF5QztBQUN6QyxtQ0FBMkI7QUFDM0IsbUNBQW1DO0FBQ25DLG1DQUE4QjtBQUM5QixtQ0FBZ0M7QUFDaEMsbUNBQXNDO0FBQ3RDLG1DQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkMsb0NBQWlDO0FBQ2pDLG9DQUFxQztBQUNyQyxvQ0FBc0M7QUFDdEMsb0NBQTRCO0FBQzVCLG9DQUE4QjtBQUM5QixvQ0FBK0I7QUFFL0Isb0NBQXdDO0FBRXhDLG9DQUFrQztBQUNsQyxvQ0FBNkI7QUFHN0Isb0NBQWlDO0FBQ2pDLG9DQUFnQztBQUdoQyx1QkFBYSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDbkMsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFFM0Isb0JBQVcsQ0FBQyxNQUFNLENBQ2hCLGtCQUFDLHdCQUFjLElBQUMsT0FBTztJQUNyQixrQkFBQyxlQUFNLElBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsRUFBRSxHQUFFO0lBQ3RDLGtCQUFDLGNBQUksSUFBQyxLQUFLLEVBQUMsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUMsU0FBUztRQUNoRSxrQkFBQyxvQkFBVSxJQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRO1lBRXJDLGtCQUFDLGtCQUFTLElBQUMsUUFBUSxRQUFDLElBQUksUUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDeEUsa0JBQUMsa0JBQVMsSUFBQyxPQUFPLFFBQUMsZ0JBQWdCLFFBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFlB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
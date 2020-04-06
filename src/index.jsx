import {Action} from 'tabris';
import {ActivityIndicator} from 'tabris';
import {app} from 'tabris';
import {AlertDialog} from 'tabris';
import {Button} from 'tabris';
import {CheckBox} from 'tabris';
import {CollectionView} from 'tabris';
import {Composite} from 'tabris';
import {contentView} from 'tabris';
import {ImageView} from 'tabris';
import {navigationBar} from 'tabris';
import {NavigationView} from 'tabris';
import {Page} from 'tabris'; 
import {Picker} from 'tabris';
import {Popover} from 'tabris';
import {printer} from 'tabris';
import {RefreshComposite} from 'tabris';
import {Row} from 'tabris';
import {ScrollView} from 'tabris';
import {Stack} from 'tabris';
import {StackLayout} from 'tabris';
import {statusBar} from 'tabris';
import {Switch} from 'tabris';
import {TextInput} from 'tabris'; 
import {TextView} from 'tabris';
import {ToggleButton} from 'tabris'; 

navigationBar.displayMode = 'hide'; 
let activityIndicator = {};

contentView.append(
  <NavigationView stretch>
    <Action placement='default' title=''/>
    <Page title="Ice'n'Roll Manager"  padding={8} background='#fafafa'>
      <ScrollView top={0} bottom={0} stretchX>
        
        <Composite stretchX left right='50%' height={150} padding={5} elevation={4}>
          <Composite stretch highlightOnTouch background='#fff' onTap={orderManager} cornerRadius={24} padding={20}>
            <ImageView center image='resources/icons8-shopping-cart-50-blue.png' width={50} height={50} onTap={orderManager}/>
            <TextView centerX top='prev()'>Zamówienia</TextView>
          </Composite> 
        </Composite>
        <Composite stretchX left='50%' right={0} height={150} padding={5}>
          <Composite stretch highlightOnTouch background='#fff' cornerRadius={24} padding={20} onTap={deliveryManager}>
            <ImageView center image='resources/icons8-truck-50-blue.png' width={50} height={50} onTap={deliveryManager}/>
            <TextView centerX top='prev()'>Dostawa</TextView>
          </Composite>
        </Composite>
        <Composite top='prev()' stretchX left right='50%' height={150} padding={5}>
          <Composite stretch highlightOnTouch background='#fff' onTap={menuManager} cornerRadius={24} padding={20}>
            <ImageView center image='resources/icons8-restaurant-menu-50-blue.png' width={50} height={50} onTap={menuManager}/>
            <TextView centerX top='prev()'>Menu</TextView>
          </Composite> 
        </Composite>
        <Composite top={150} stretchX left='50%' right={0} height={150} padding={5}>
          <Composite stretch highlightOnTouch background='#fff' onTap={productManager} cornerRadius={24} padding={20}>
            <ImageView center image='resources/icons8-grocery-store-50-blue.png' width={50} height={50} onTap={productManager}/>
            <TextView centerX top='prev()'>Magazyn</TextView>
          </Composite>
        </Composite>
      </ScrollView> 
    </Page>
  </NavigationView>
);
 
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

async function showTextInputDialog() {
  const dialog = AlertDialog.open(
    <AlertDialog title='Logowanie' buttons={{ok: 'Zaloguj'}}>
      Podaj swoje imię, aby zalogować się do Ice'n'Roll Manager. 
      <TextInput message='Username' />
    </AlertDialog>
  );
  const {texts, button} = await dialog.onClose.promise();
  if (button === 'ok') {
    localStorage.setItem('inr_mgr_username', texts);
  }
  $(Action).only().title = texts;
}

if( localStorage.getItem('inr_mgr_username') === null )
  showTextInputDialog();
else
  $(Action).only().title = localStorage.getItem('inr_mgr_username');

const navigationView = $(NavigationView).only();
const IMG_CLOSE = device.platform === 'iOS' ? 'resources/icons8-close-window-24-white.png' : 'resources/outline_close_white_24dpx1.png';
let stackView = {};
var products = {};
let orders = {};
let refreshComposite = {};

async function deliveryManager(){
  navigationView.append( 
    <Page title='Plan dostawy' background='#F4F8FB'>
      <ActivityIndicator layoutData='center'/>
      <ScrollView top={0} bottom={0} stretchX>
      <Composite id='mainList' top={20} left={15} right={15} height={64} cornerRadius={16} background='#fff' elevation={8}>
        <ScrollView stretchX top='prev()' bottom='next()'> 
          <Stack id='productStack' stretchX>
            
          </Stack>
        </ScrollView>
      </Composite>
      <Composite top='prev() 20' stretchX height={100}>
        <Button center padding={[16, 32, 16, 32]} onSelect={routePlan}>Zaplanuj trasę</Button>
      </Composite>
      </ScrollView>
    </Page> 
  );

  let activityIndicator = $(ActivityIndicator).only();
  stackView = $(Stack).only();
  activityIndicator.visible = true;

  const response = await fetch('https://icenroll.pl/freezer/ajax/get-orders-shipping/', {method: 'POST'});
  const data = await response.json();
  let orders = data;
  deliveryNum = orders.length;

//  logDisplay(orders.length);
  const elementHeight = (orders.length) * 65;
  $(Composite).only('#mainList').height = elementHeight;

  for( var i = 0; i < orders.length; i++ ){
    const idx = orders[i].order_id;
    if(orders[i].address_2 === '')
      address[i] = orders[i].address_1 + '+' + orders[i].postcode + '+' + orders[i].city;
    else
      address[i] = orders[i].address_1 + '+' + orders[i].address_2 + '+' + orders[i].postcode + '+' + orders[i].city;
    address[i] = address[i].replace(' ', '+');
    check[i] = 0;
    const checkBoxId = 'checkBox-' + i;

    stackView.append( 
      <Composite id='parentC' stretchX>
        <Composite padding={16} height={64} stretchX centerY highlightOnTouch onTap={ev => showOrderPopover(ev, idx)}>
          <TextView id='total' centerY left={6} right='next() 20' >#{orders[i].order_id}</TextView>
          <TextView id='address' centerY left='25%' right='next()' >{orders[i].address_1} {orders[i].address_2}</TextView>
          <CheckBox id={checkBoxId} right={20}></CheckBox>
        </Composite>
        <Composite stretchX height={1} background='#e0e0e0'></Composite>
      </Composite>
    )
  }

  activityIndicator.visible = false;
}

async function routePlan(){
  var mapPoints = '/Current+Location';
  for( var i = 0; i < deliveryNum; i++ ){
    const checkBoxId = '#checkBox-' + i;
    if( $(CheckBox).only('#checkBox-'+i).checked ){
      var addr;
      if( address[i].search('/') >= 0 )
        addr = '/' + address[i].substr( 0, address[i].search('/') );
      else
        addr = '/' + address[i];
      mapPoints += addr;
    }
  }

  const googleMapsURL = encodeURI( mapPoints );
  let maps = device.platform === 'iOS' ? 'maps' : 'https';
  maps = maps +'://www.google.com/maps/dir/' + googleMapsURL;
  try {
    await app.launch(maps);
  } catch (ex) {
    logDisplay(ex.message);
  }
}

async function orderManager(){
  navigationView.append( 
    <Page title='Zamówienia'>
      <ActivityIndicator layoutData='center'/>
      <RefreshComposite stretch refreshEnabled onRefresh={handleRefresh}>
      <Composite stretchX top={0} bottom={0}>
        <Composite id='parentC' stretchX background='#71BCF2' padding={[0, 16, 0, 16]}>
          <Composite height={48} stretchX centerY>
            <TextView id='date' centerY left={0} textColor='#fff' font='16px'>Data</TextView>
            <TextView id='quantity' centerY left='23%' right='next()' alignment='centerX' textColor='#fff' font='16px'>Ilość</TextView>
            <TextView id='total' centerY left='34%' right='next() 10' alignment='right' textColor='#fff' font='16px'># Zam</TextView>
            <TextView id='status' centerY left='56%' right='next()' alignment='centerX' textColor='#fff' font='16px'>Status</TextView>
            <TextView id='handler' centerY left='82%' width={60} alignment='centerX' textColor='#fff' font='16px'>Opiekun</TextView>
          </Composite>
        </Composite>
        <Composite stretchX top='prev()' height={2} background='#e0e0e0'></Composite>
        <ScrollView stretchX top='prev()' bottom='next()'> 
          <Stack id='productStack' stretchX>
            
          </Stack>
        </ScrollView>
      </Composite>
      </RefreshComposite>
    </Page>
  );

  refreshComposite = $(RefreshComposite).only();
  let activityIndicator = $(ActivityIndicator).only();
  stackView = $(Stack).only();
  activityIndicator.visible = true;

  const response = await fetch('https://icenroll.pl/freezer/ajax/get-orders/', {method: 'POST'});
  const data = await response.json();
  let orders = data;
  let fontWeight = '';

  for( var i = 0; i < orders.length; i++ ){
    const idx = orders[i].order_id;
    let color = "#000";

    if( orders[i].handler === '' ){
      fontWeight = 'bold 14px';
      color = '#000';

    if( orders[i].order_status === 'Zakończone' )
      color = '#A0A0A0';

    if( orders[i].order_status === 'Anulowane' )
      color = '#C6C6C6';
    }
    else
      fontWeight = '';

    stackView.append( 
      <Composite id='parentC' stretchX padding={[0, 16, 0, 16]}>
        <Composite height={64} stretchX centerY highlightOnTouch onTap={ev => showOrderPopover(ev, idx)}>
          <TextView id='date' centerY left={0} right='next()' textColor={color} font={fontWeight}>{orders[i].order_modified}</TextView>
          <TextView id='quantity' centerY left='26%' right='next()' alignment='centerX' textColor={color} font={fontWeight}>{orders[i].item_cnt}</TextView>
          <TextView id='total' centerY left='32%' right='next() 20' alignment='right' textColor={color} font={fontWeight}>#{orders[i].order_id}</TextView>
          <TextView id='status' centerY left='57%' right='next()' alignment='centerX' textColor={color} font={fontWeight}>{truncate( orders[i].order_status, 14 )}</TextView>
          <TextView id='handler' centerY left='84%' right={0} alignment='right' textColor={color} font={fontWeight}>{orders[i].handler}</TextView>
        </Composite>
        <Composite stretchX height={1} background='#e0e0e0'></Composite>
      </Composite>
    )
  }

  activityIndicator.visible = false;
}

async function handleRefresh(){
  navigationView.pages().last().dispose();
  orderManager();
}

function truncate(input, limit) {
  if (input.length > (limit - 3))
     return input.substring(0,limit-3) + '...';
  else
     return input;
};

async function showOrderPopover(event, order_id) {
  navigationBar.displayMode = 'hide'; 

  const formData = new FormData();
  formData.set('id', order_id);
  formData.set('handler', localStorage.getItem('inr_mgr_username'));
  const result = await fetch('https://icenroll.pl/freezer/ajax/get-order-details/', {method: 'POST', body: formData});
  const data = await result.json();
  
  const title = 'Zamówienie #' + order_id; 
  let address_2 = data.address_2;
  if(address_2 !== '' )
    address_2 = '<br>' + address_2;
  const googleMapsURL = encodeURI( '&query=' + data.address_1 + ' ' + data.address_2 + ',' + data.postcode  + ',' + data.city);

  const statusItems = ['Do dowiezienia', 'Dostarczone', 'Odbiór osobisty'];
  let idx = 0;
  switch( data.order_status ){
    case 'Dostawa':
      idx = 0;
      break

    case 'Zakończone':
      idx = 1;
      break;

    case 'Do odbioru':
      idx = 2;
      break;

    default:
      idx = 0;
  }
  const StatusPicker = attributes => <Picker itemCount={statusItems.length} itemText={index => statusItems[index]} {...attributes} selectionIndex={idx}/>;
  const itemsScrollHeight = (data.items.length + 2) * 44;

  const popover = Popover.open(
    <Popover width={300} height={600}>
      <NavigationView stretch>
        <Action placement='navigation' title='Close' image={IMG_CLOSE} onSelect={() => popover.close()}/>
        <Page title={title} top='prev() 200' background='#F4F8FB'>
          <ScrollView id='orderScroll' top={0} bottom={0} stretchX>
            <Composite stretchX padding={16} top={20} left={20} right={20} height={160} background='#fff' elevation={4} cornerRadius={6} onTap={ev => launchMaps(ev, googleMapsURL)}>
              <TextView alignment='left' top='prev() 3' font='bold 14px'>{data.first_name} {data.last_name}</TextView>
              <TextView alignment='left' top='prev() 3' markupEnabled lineSpacing={1.2}>{data.address_1}{address_2}</TextView>
              <TextView alignment='left' top='prev() 3'>{data.postcode}, {data.city}</TextView>
              <TextView alignment='right' bottom={5} right={35} font='bold 16px' stretchX textColor='#a8a8a8'>Adres dostawy</TextView>
              <ImageView image='resources/icons8-ok-30.png' bottom={0} right={0} width={30} height={30}></ImageView>
              <ImageView image='resources/icons8-google-maps-48.png' top={0} right={0} width={30} height={30} onTap={ev => launchMaps(ev, googleMapsURL)}></ImageView>
            </Composite>
            <Composite stretchX padding={16} top='prev() 20' left={20} right={20} height={90} background='#fff' elevation={4} cornerRadius={6} onTap={ev => callNum(ev, data.phone)}>
              <ImageView image='resources/icons8-email-20.png' left={0} width={20} height={20}></ImageView>
              <TextView alignment='left' top={0} left='prev() 5'>{data.email}</TextView>
              <ImageView image='resources/icons8-phone-20-glyph.png' top='prev() 15' left={0} width={20} height={20} onTap={ev => callNum(ev, data.phone)}></ImageView>
              <TextView alignment='left' left='25' top={35} onTap={ev => callNum(ev, data.phone)}>{data.phone}</TextView>
              <TextView alignment='right' bottom={3} right={35} font='bold 16px' stretchX textColor='#a8a8a8'>Kontakt</TextView>
              <ImageView image='resources/icons8-ok-30.png' bottom={0} right={0} width={30} height={30} ></ImageView>
            </Composite>
            
            <Composite height={itemsScrollHeight} stretchX top='prev()'>
              <TextView top='prev()' padding={[20, 25, 0, 25]} font='bold 16px'>Podsumowanie zamówienia</TextView>
              <CollectionView id='colView' top='prev()' padding={10} stretch itemCount={data.items.length} cellHeight={48} createCell={createItemCell} updateCell={updateItemCell}/>
            </Composite>
            <Composite top='prev()' padding={[10, 20, 20, 20]} left stretchX>
              <StatusPicker id='statusPicker' left stretchX style='outline' message='Status' background='#fff' elevation={2} onSelect={ev => statusChange(ev, ev.index)}/>
            </Composite>
          </ScrollView>
        </Page>
      </NavigationView> 
    </Popover>
  );

  async function statusChange(event, index){
    const statusItems = ['Do dowiezienia', 'Dostarczone', 'Odbiór osobisty'];
    const dialog = AlertDialog.open(
      <AlertDialog title='Zmiana statusu' buttons={{ok: 'Zmień', cancel: 'Anuluj'}}>
        Zmienić status zamówienia na "{statusItems[index]}"?
      </AlertDialog>
    );
    const {texts, button} = await dialog.onClose.promise();
    if (button === 'ok') {
      activityIndicator.visible = true;
      const formData = new FormData();
      formData.set('order_id', order_id);
      formData.set('status', statusItems[index]);
      const result = await fetch('https://icenroll.pl/freezer/ajax/set-order-status/', {method: 'POST', body: formData});
      const data = await result.json();
      popover.close();
      handleRefresh();
    } 
    else {
      event.target.selectionIndex = idx;
    }
  }

  const itemsOrder = $(Stack).only();
  navigationBar.displayMode = 'hide'; 

  function createItemCell() {
    return (
      <Composite id='parentC' stretchX padding={[0, 5, 0, 5]}>
        <Composite height={40} stretchX centerY padding={[10, 10, 10, 10]}>
          <TextView id='productName' centerY left={0} right='10%'></TextView>
          <TextView id='productQty' centerY right={5} width={30} alignment='centerX'></TextView>
        </Composite>
        <Composite stretchX height={3} background='#fff' elevation={1}></Composite>
      </Composite>
    );
  }
  
  function updateItemCell(cell, index) {
    cell.find(TextView).only('#productName').text = data.items[index].product_name;
    cell.find(TextView).only('#productQty').text = data.items[index].item_qty;
  }
}

async function callNum(event, num){
  const numberCall = 'tel:' + num;
  try {
    await app.launch(numberCall);
  } catch (ex) {
    logDisplay(ex.message);
  }
}

async function launchMaps(event, url) {
  let maps = device.platform === 'iOS' ? 'maps' : 'https';
  maps = maps +'://www.google.com/maps/search/?api=1' + url;
  try {
    await app.launch(maps);
  } catch (ex) {
    logDisplay(ex.message);
  }
}

function showNavBar(){
  navigationBar.displayMode = 'hide';
}

//sendNotification("Nowe zamówienie", "Wpłyneło nowe zamówienie online.");

async function sendNotification(title, message){
  const formData = new FormData();
  formData.set('id', 'FjoEmpnBc');
  formData.set('type', 'Icenroll');
  formData.set('title', title);
  formData.set('message', message);
  formData.set('image_url', 'https://icenroll.pl/img/icons8-mobile-order-64.png')
  const result = await fetch('https://wirepusher.com/send', {method: 'POST', body: formData});
  const data = await result.json();
}

async function getProducts(){
  const response = await fetch('https://icenroll.pl/freezer/ajax/get-products/', {method: 'POST'});
  const data = await response.json();
  products = data;
  logDisplay(data.length);
  return products;
}

async function productManager(){
  navigationView.append( 
    <Page title='Sklep'>
      <ActivityIndicator layoutData='center'/>
      <Composite stretchX top={10} left={10} right={10} height={100} background='#fff' elevation={4} cornerRadius={6} >
        <Composite left right='40%' stretchX centerY>
          <TextView top='prev() 5' alignment='right' font='16px' stretchX>Smaków w sklepie:</TextView> 
          <TextView top='prev() 5' alignment='right' font='16px' stretchX>Opakowań w sklepie:</TextView> 
        </Composite>
        <Composite left='60%' right={0} centerY>
          <TextView id='totalProducts' top='prev() 7' left={5} font='16px'></TextView> 
          <TextView id='totalItems' top='prev() 5' left={5} font='16px'></TextView> 
        </Composite>
        <Composite height={1} stretchX bottom='next()' background='#D0D0D0'></Composite>
      </Composite>
      <Composite stretchX top='prev()' bottom={0}>
        <ScrollView stretchX top={0} bottom='next()'> 
          <Stack id='productStack' stretchX>
            
          </Stack>
        </ScrollView>
      </Composite>
    </Page>
  );

  const activityIndicator = $(ActivityIndicator).only();
  stackView = $(Stack).only();
  activityIndicator.visible = true;
  const response = await fetch('https://icenroll.pl/freezer/ajax/get-products/', {method: 'POST'});
  const data = await response.json();
  products = data;
  
  var bg, minusImg, tintColor, cnt = 0, totalCnt = 0;

  for( var i = 0; i < products.length; i++ ){
    const idx = products[i].flavour_id;
    if(products[i].quantity == null)
      products[i].quantity = 0;
    if( parseInt( products[i].quantity ) > 0 ){
      bg = '#fff';
      tintColor = 'initial';
      cnt++;
      totalCnt += parseInt( products[i].quantity );
    }
    else{
      bg = '#F2F2F2';
      tintColor = '#ccc';
    }

    stackView.append( 
      <Composite id='parentC' stretchX padding={[0, 16, 0, 16]} background={bg}>
        <Composite height={64} stretchX centerY>
          <TextView id='flavourName' centerY left={0} right='40%'>{products[i].flavour_name}</TextView>
          <TextView id='quantity' centerY right={50} width={30} alignment='centerX'>{products[i].quantity}</TextView>
          <ImageView id='imgMinus' centerY image='resources/icons8-minus-40.png' right={80} width={40} height={40} onTap={ev => decreaseQuantity(ev, idx, i)} tintColor={tintColor}></ImageView>
          <ImageView centerY image='resources/icons8-plus-40.png' right={10} width={40} height={40} onTap={ev => increaseQuantity(ev, idx, i)}></ImageView>
        </Composite>
        <Composite stretchX height={1} background='#e0e0e0'></Composite>
      </Composite>
    )
  }
  activityIndicator.visible = false;
  $(TextView).only('#totalProducts').text = cnt;
  $(TextView).only('#totalItems').text = totalCnt;
}

async function decreaseQuantity(event, idx, i){
  if( event.target.parent(Composite).find(ImageView).only('#imgMinus').tintColor != 'initial' ){
    return;
  }
  const flavourName = event.target.parent(Composite).find(TextView).only('#flavourName').text;
  var qty = parseInt( event.target.parent(Composite).find(TextView).only('#quantity').text ) - 1;
  event.target.parent(Composite).find(TextView).only('#quantity').text = qty;

  let totalCnt = parseInt( $(TextView).only('#totalItems').text) - 1;
  $(TextView).only('#totalItems').text = totalCnt;

  if( qty == 0 ){
    event.target.parent(Composite).find(ImageView).only('#imgMinus').tintColor = '#ccc';
    event.target.parent('#parentC').background = '#F2F2F2';
    $(TextView).only('#totalProducts').text = parseInt($(TextView).only('#totalProducts').text) - 1;
  }

  qty = -1; 
  const formData = new FormData();
  formData.set('product_id', idx);
  formData.set('product_quantity', qty);
  const result = await fetch('https://icenroll.pl/freezer/ajax/set-quantity/', {method: 'POST', body: formData});
  const data = await result.json();
}

async function increaseQuantity(event, idx, i){
  const flavourName = event.target.parent(Composite).find(TextView).only('#flavourName').text;
  const prevQty = parseInt( event.target.parent(Composite).find(TextView).only('#quantity').text );

  if( prevQty == 0 ){
    var newQty = parseInt($(TextView).only('#totalProducts').text) + 1;
    $(TextView).only('#totalProducts').text = newQty;
  }

  let totalCnt = parseInt( $(TextView).only('#totalItems').text) + 1;
  $(TextView).only('#totalItems').text = totalCnt;

  var qty = parseInt( event.target.parent(Composite).find(TextView).only('#quantity').text ) + 1;
  event.target.parent(Composite).find(TextView).only('#quantity').text = qty;
  if( qty > 0 ){
    event.target.parent(Composite).find(ImageView).only('#imgMinus').tintColor = 'initial';
    event.target.parent('#parentC').background = '#fff';
  }

  qty = 1;
  const formData = new FormData();
  formData.set('product_id', idx);
  formData.set('product_quantity', qty);
  const result = await fetch('https://icenroll.pl/freezer/ajax/set-quantity/', {method: 'POST', body: formData});
  const data = await result.json();
}

var flavours = {};
//getFlavours();

async function getFlavours(){
  const response = await fetch('https://icenroll.pl/freezer/ajax/get-flavours/', {method: 'POST'});
  const data = await response.json();
  flavours = {};
  flavours = data;
  return flavours;
}

//<Composite stretchX top height={64} background='#eaeaea' padding={5}>

async function menuManager(){
  navigationView.append( 
    <Page title='Menu'>
      <ActivityIndicator layoutData='center'/>
      <Composite stretchX top={15} left={15} right={15} height={68} background='#fff' elevation={4} cornerRadius={6} >
        <Composite left right='40%' stretchX centerY>
          <TextView alignment='right' font='16px' stretchX>Smaków w witrynie:</TextView> 
        </Composite>
        <Composite left='60%' right={0} centerY>
          <TextView id='totalMenu' left={5} font='16px'></TextView> 
        </Composite>
      </Composite>
      <Composite stretchX top='prev()' bottom={0}>
        <ScrollView stretchX top={0} bottom='next()'> 
          <Stack id='menuStack' stretchX></Stack>
          
        </ScrollView>
      </Composite>
    </Page>
  );
  const activityIndicator = $(ActivityIndicator).only();
  activityIndicator.visible = true;
  const response = await fetch('https://icenroll.pl/freezer/ajax/get-flavours/', {method: 'POST'});
  const data = await response.json();
  flavours = data;
  stackView = $(Stack).only();
  
  var bg, col;
  var cnt = 0;

  for( var i = 0; i < flavours.length; i++ ){
    const idx = i;
    if( parseInt( flavours[i].in_menu ) == 1 ){
      bg = '#0071DB';
      col = '#fff';
      cnt++;
    }
    else{
      bg = '#fff';
      col = '#0071DB';
    }
    stackView.append(
      <Composite stretchX padding={[0, 16, 0, 16]}>
        <Composite height={50} background={bg} padding={[6, 16, 6, 16]} highlightOnTouch stretchX cornerRadius={9} onTap={ev => toggleFlavour(ev, idx)}>
          <TextView id={flavours[i].flavour_id} centerY left={0} textColor={col}>{flavours[i].flavour_name}</TextView>
        </Composite>
        <Composite stretchX height={1} background='#eeeeee' elevation={1}></Composite>
      </Composite>
    )
    
  }
  activityIndicator.visible = false;
  $(TextView).only('#totalMenu').text = cnt;
}

function toggleFlavour(event, idx){
  const flavourName = event.target.find(TextView).only().text;
  const bg = event.target.background;
  var total = parseInt( $(TextView).only('#totalMenu').text );
//  logDisplay(flavourName + ' ' + idx);
//  logDisplay(bg);
  if( bg == 'rgb(0, 113, 219)'){
    event.target.background = '#fff';
    event.target.find(TextView).only().textColor = bg;
    flavours[idx].in_menu = '0';
    total--;
  }
  else{
    event.target.background = '#0071DB';
    event.target.find(TextView).only().textColor = '#fff';
    flavours[idx].in_menu = '1';
    total++;
  }
  $(TextView).only('#totalMenu').text = total;

  menuSave();
}

async function menuSave(){
  const formData = new FormData();
  var cnt = 0;
  
  for( var i = 0; i < flavours.length; i++ ){
    if( parseInt( flavours[i].in_menu ) == 1 ){
      formData.set('id-'+cnt, flavours[i].flavour_id);
      cnt++;
    }
    // SELECT * FROM menu WHERE MENU_ITEM_FLAVOUR_ID NOT IN (810, 813, 1296, 812, 838, 839, 1321, 1294, 1314)

    // ID = 813, 813 = MASCARPONE
  }
  if( cnt === 0 ){
    logDisplay('cent = 0');
    formData.set('id-0', 'del-all');
  }
  const result = await fetch('https://icenroll.pl/freezer/ajax/set-menu/', {method: 'POST', body: formData});
  const data = await result.json();
  logDisplay(data.response);
}

function createCell() { 
  return (
    <Composite>
      <Composite id='container' stretch background='white' highlightOnTouch onTap={toggleFlavour}>
        <TextView centerY id='flavourName' left={16}/>
      </Composite>
      <Composite stretchX height={2} background='#eeeeee'/>
    </Composite>
  );
}

function updateCell(cell, index) {
  const flavour = flavours[index];
  cell.find(TextView).only('#flavourName').text = flavour.flavour_name;
  cell.find(Composite).only('#container').data.flavour_id = flavour.flavour_id;
  cell.find(Composite).only('#container').data.in_menu = flavour.in_menu;
  cell.find(Composite).only('#container').data.index = index;
  if( parseInt(flavour.in_menu) == 1 ){
    cell.find(Composite).only('#container').background = '#0071DB';
    cell.find(TextView).only('#flavourName').textColor = '#fff';
    cell.find(Composite).only('#container').data.in_menu = '0';
  }
  else{
    cell.find(Composite).only('#container').background = '#fff';
    cell.find(TextView).only('#flavourName').textColor = '#0071DB';
    cell.find(Composite).only('#container').data.in_menu = '1';
  }
}

function logDisplay( message ){
  AlertDialog.open(
    <AlertDialog title='Log' message={message} buttons={{ok: 'OK'}}/>
  ); 
}

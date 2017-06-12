describe('swapi demo page - ', function() {
  const BASE_URL = "http://localhost:3000/"
  it('should get all people', function() {
    browser.waitForAngularEnabled(true);
    browser.get(BASE_URL);
    
    expect(element(by.css('swapiPage h1')).getText(),"Swapi Demo Page!");
    
    element(by.id('get-people')).click();
    
    var allPeople = element.all(by.tagName('pre'));
    expect(allPeople.getText()).not.toEqual(null);
  });
  
  it('should get specific people', function() {
    browser.waitForAngularEnabled(true);
    browser.get(BASE_URL);
  
    expect(element(by.css('swapiPage h1')).getText(),"Swapi Demo Page!");
  
    element(by.id('id-people')).sendKeys('1');
    element(by.id('get-people')).click();
  
    var allPeople = element.all(by.tagName('pre'));
    expect(allPeople.getText()).not.toEqual(null);
  });
});
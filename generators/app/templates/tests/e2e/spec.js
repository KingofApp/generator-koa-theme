describe('Theme e2e test', function() {
  beforeAll(function() {
    browser.driver.manage().window().setSize(400, 666);
    browser.get('http://localhost:9001/#/menu-abcd/elements-abcd');
    browser.waitForAngular();
  });

  it('should click the dialog', function(){
    var button = element(by.css('#content > div > div > div > section:nth-child(6) > div:nth-child(4) > nuevo-tema-button'));
    var EC = protractor.ExpectedConditions;

    browser.wait(EC.elementToBeClickable(button), 20000);
    button.click();
  });

  it('should load koa-menu & koa-submenu', function() {
    var identifier = '#content > div > div > div > section:nth-child(14) > h3';
    expect(element(by.css(identifier))).toBeDefined();
    element(by.css(identifier)).getText().then(function(text) {
      expect(text).toBe('koa-menu & koa-submenu');
    });
  });

  it('should display <%= themeName %>-menu & <%= themeName %>-submenu (koa-menu & koa-submenu)', function() {
    var identifier = '#content > div > div > div > section:nth-child(14)';
    element(by.css(identifier)).getAttribute('outerHTML').then(function(text) {
      expect(text).toMatch(/<%= themeName %>-menu/);
    });
    element(by.css(identifier)).getAttribute('outerHTML').then(function(text) {
      expect(text).toMatch(/<%= themeName %>-submenu/);
    });
  });

  it('should load koa-input & koa-textarea', function() {
    var identifier = '#content > div > div > div > section:nth-child(12) > h3';
    expect(element(by.css(identifier))).toBeDefined();
    element(by.css(identifier)).getText().then(function(text) {
      expect(text).toBe('koa-input & koa-textarea');
    });
  });

  it('should display <%= themeName %>-input & <%= themeName %>-textarea (koa-input & koa-textarea)', function() {
    var identifier = '#content > div > div > div > section:nth-child(12)';
    element(by.css(identifier)).getAttribute('outerHTML').then(function(text) {
      expect(text).toMatch(/<%= themeName %>-input/);
    });
    element(by.css(identifier)).getAttribute('outerHTML').then(function(text) {
      expect(text).toMatch(/<%= themeName %>-textarea/);
    });

  });


<% for(var i=0; i<elements.length; i++) {%>

  it('should load koa-<%= elements[i].item %>', function() {
    var identifier = '#content > div > div > div > section:nth-child(<%= elements[i].position %>) > h3';
    expect(element(by.css(identifier))).toBeDefined();
    element(by.css(identifier)).getText().then(function(text) {
      expect(text).toBe('koa-<%= elements[i].item %>');
    });
  });

  it('should display <%= themeName %>-<%= elements[i].item %> (koa-<%= elements[i].item %>)', function() {
    element(by.css('#content > div > div > div > section:nth-child(<%= elements[i].position %>)')).getAttribute('outerHTML').then(function(text) {
      expect(text).toMatch(/<%= themeName %>-<%= elements[i].item %>/);
    });
  });

    it('should display <%= themeName %>-<%= elements[i].item %> (koa-<%= elements[i].item %> with a minimum dimensions)', function() {

      var selector = '<%= themeName %>-<%= elements[i].item %>';

      browser.executeScript(computedDetails(selector,'height')).then(function(text) {
        expect([true, "auto"]).toContain(text !== "auto" ? parseInt(text.replace("px", "")) > 0 : "auto");
      });


      browser.executeScript(computedDetails(selector,'width')).then(function(text) {
        expect([true, "auto"]).toContain(text !== "auto" ? parseInt(text.replace("px", "")) > 0 : "auto");
      });

    });

    it('should register <%= themeName %>-<%= elements[i].item %> (koa-<%= elements[i].item %> as a Polymer Element)', function() {
      expect(browser.executeScript(isElementRegistered("<%= themeName %>-<%= elements[i].item %>"))).toBe(true);
    });


<% } %>


  function isElementRegistered(label){
    return 'return document.createElement("'+label+'").constructor !== HTMLElement'
  }

  function computedDetails(label, property){
    return 'return window.getComputedStyle(document.querySelector("'+label+'"), null).getPropertyValue("'+property+'")';
  }

});

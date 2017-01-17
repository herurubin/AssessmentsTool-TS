var generalInfoTemplate = `
<div id="general-settings-app">
<div class="translucent" id="obscure-settings"></div>
    <div class="row">
        <div class="col-lg-3">            
          <label for="assess-this">What is being assessed?</label>
          <input type="text" class="form-control" id="assess-this">
        </div>
        <div class="col-lg-3">            
          <label for="assess-name">Name this assessment:</label>
          <input type="text" class="form-control" id="assess-name">
        </div>
        <div class="col-lg-3">            
          <label for="author-name">Your name:</label>
          <input type="text" class="form-control" id="author-name">
        </div>
        <div class="col-lg-3">            
          <label for="author-corpid">Your Corporate ID number:</label>
          <input type="text" class="form-control" id="author-corpid">
        </div>
    </div>
    
    <div class="row">
        <div class="col-lg-3">            
             <div class="form-group">
              <label for="sel1">Send to (List of Corporate IDs and Name pairs):</label>
          <input type="text" class="form-control" id="email-list">
             </div>
        </div>
        <div class="col-lg-3">            
          <div class="form-group">
              <label for="sel1">Re-send the assessment this often:</label>
              <select class="form-control" id="sel1">
                <option>Once a month</option>
                <option>Every quarter</option>
                <option>Every 6 months</option>
                <option>yearly</option>
              </select>        
             </div>
        </div>
        <div class="col-lg-3">    
        </div>
        <div class="col-lg-3"> 
        </div>
     
    
</div>
`

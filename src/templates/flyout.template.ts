var flyoutTemplate = `
<div id="flyout" class="app-window" style="display: none;">
    <div id="edit-section" class="row">
            <div class="col-lg-12">            
              <label for="input-section">What section should this be grouped into?</label>
              <input type="text" class="form-control" id="input-section">
            </div>        
    </div>

    <div id="edit-question" class="row">
            <div class="col-lg-12">            
              <label for="input-section">Enter the question's text to display:</label>
              <input type="text" class="form-control" id="input-question">
            </div>        
    </div>
    
    <div id="edit-explain" class="row">
            <div class="col-lg-12">            
              <label for="input-section">Provide an explanation or context that will help the user answer:</label>
              <input type="text" class="form-control" id="input-explain">
            </div>        
    </div>
    
    <div id="edit-response" class="row">
            <div class="col-5up">            
              <label for="input-r1">Rated 1 out of 5, criteria:</label>
              <input type="text" class="form-control" id="input-r1">
            </div> 
            
            <div class="col-5up">            
              <label for="input-r2">Rated 2 out of 5, criteria:</label>
              <input type="text" class="form-control" id="input-r2">
            </div>
            
            <div class="col-5up">            
              <label for="input-r3">Rated 3 out of 5, criteria:</label>
              <input type="text" class="form-control" id="input-r3">
            </div>
                        
            <div class="col-5up">            
              <label for="input-r4">Rated 4 out of 5, criteria:</label>
              <input type="text" class="form-control" id="input-r4">
            </div>
                        
             <div class="col-5up">            
              <label for="input-r5">Rated 5 out of 5, criteria:</label>
              <input type="text" class="form-control" id="input-r5">
            </div>           
    </div>
    
    <div id="edit-required" class="row">
            <div class="col-lg-12">            
              <label for="required-form">Is this required?</label>
              <form id="required-form">
                    <label class="radio-inline">
                      <input id="input-req" type="radio" name="opt-or-req" value="required" checked>Required
                    </label>
                    <label class="radio-inline">
                      <input id="input-opt" type="radio" name="opt-or-req" value="optional">Optional
                    </label>                    
              </form>
            </div>        
    </div>
    <div class="row">
        <nav class="navbar flyout-footer">
          <div class="container-fluid flyout-menu">
           <ul class="nav navbar-nav">
              <li><button id="cancel-edit" class="btn btn-cancel">Cancel</button> </li>
              <li><button id="apply" class="btn btn-apply">Apply</button></li>              
            </ul>
          </div>
        </nav>
    </div>
</div>
`

var caratTemplate : string = `
<div class="carat-down" id="flyout-carat"></div>
`


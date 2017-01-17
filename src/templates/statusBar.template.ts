/// <reference path="../SaveLoad.ts" />
/// <reference path="../GridManagement.ts" />



var statusBarTemplate =`

<nav class="navbar grid-footer">
  <div class="container-fluid footer-menu width-full">
   <ul class="nav navbar-nav width-full">
      <li><button id="add-new" class="btn btn-apply"><div class="btn-label">Add New Question</div> <div class="icon-add statusbar-icon"></div></button> </li>
      <li><button id="duplicate" class="btn btn-apply"><div class="btn-label">Duplicate Selected </div><div class="icon-dup statusbar-icon"></div></button></li>
      
      
      <li><button id="move-up" class="btn btn-apply"><div class="icon-up statusbar-icon"> </div></button></li>
      <li><button id="move-down" class="btn btn-apply"><div class="icon-down statusbar-icon"> </div></button></li>
      
      <li><button id="delete" class="btn btn-delete"><div class="btn-label">Delete Selected</div> <div class="icon-delete statusbar-icon"></div></button></li>
      <li class="btn-save"><button id="saveAll" class="btn btn-saveAll "><div class="btn-label">Save Assessment</div>  <div class="icon-save statusbar-icon"></div> </button></li>
    </ul>
  </div>
</nav>
`



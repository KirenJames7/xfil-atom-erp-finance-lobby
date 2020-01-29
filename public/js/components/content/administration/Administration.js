/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import TabNav from '../../elements/TabNav.js';
import Table from '../../elements/Table.js';
import Button from '../../elements/Button.js';
import ModalFormCustom from '../../elements/ModalFormCustom.js';
import Label from '../../elements/Label.js';
import Required from '../../elements/Required.js';
import Input from '../../elements/Input.js';
import CheckBox from '../../elements/CheckBox.js';
import CheckBoxInline from '../../elements/CheckBoxInline.js';
import SelectLabel from '../../elements/SelectLabel.js';
import Select from '../../elements/Select.js';

class Administration {
    
    constructor() {
        
    }
    
    render() {
        $(document).ready(function() {
            $(document).on("click", "#administration", function() {
                let selectedrow = {}; 
                let swaltext = document.createElement('p');
                
                $(document).on('click', '#discard', function() {
                    $.unblockUI();
                    $('form')[0].reset();
                    document.body.style.overflowY = "auto";
                    delete selectedrow.purchasegroup_administration;
                    delete selectedrow.authorizationstructure_administration;
                    //purchaseprocurement_quote.rows.add(pqlinesdata).draw();
                });
            });
        });
        return(
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Administration </h5>' +
                            '<p>Administration Coming Soon!</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
}

export default new Administration().render();
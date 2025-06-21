function MyModal(props) {
    return ( 
      <> 
        <div class="modal fade" id={props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLabel">
                    {props.title}
                </h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id={props.id + "_btnClose"}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {props.children}
              </div>
            </div>
          </div>
        </div>
    </>
    );
}

export default MyModal;
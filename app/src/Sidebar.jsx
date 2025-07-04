import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import config from "./config";
 import { Link } from "react-router-dom";

function Sidebar() {
    const [name, setName] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const header = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token_flutter')
                }
            }
            const res = await axios.get(config.apiPath + '/api/user/info', header);

            if (res.data.id !== undefined) {
                setName(res.data.name);
            }
        } catch (e) {
            Swal.fire({ 
                title: 'error',
                text: e.massage,
                icon: 'error'

            })
        }
    }
    return <>
        <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                </div>
                <div class="info">
                <a href="#" class="d-block">{name}</a>
                </div>
            </div>

            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-header">เมนู</li>
                <li class="nav-item">
                    <Link to="/room" class="nav-link">
                    <i class="nav-icon fas fa-ellipsis-h"></i>
                    <p>ห้องพัก</p>
                    </Link>
                </li>
                    <li class="nav-item">
                        <Link to="/roomRent" class="nav-link">
                            <i class="nav-icon fas fa-file"></i>
                        <p>รายงานการจองห้อง</p>
                        </Link>
                    </li> 
                </ul>
            </nav>
        </div>
    </>
}

export default Sidebar;
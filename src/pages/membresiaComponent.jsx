import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import SideBarPage from './SideBarPage';
import { Calendar } from "primereact/calendar";

import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips';
import { format } from 'date-fns';



export default function MembresiaComponent() {



    let emptyProduct = {
        cliente: '',
        disciplina: [],
        fecha:'',
        pago: '',
        monto: ''   
    };


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [categorias, setCategorias] = useState([null]);

  
    const [selectedItems, setSelectedItems] = useState([]);
    const [options] = useState([
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
    { label: 'Item 4', value: 'item4' },
    // Agrega más elementos según sea necesario
    ]);

    const handleChangeDropdown = (e) => {
        setSelectedItems(e.value);
    };


    const listchips = ["Boxeo","Spinning","Kick Boxing"];




    // search cliente 
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [allData, setAllData] = useState([]); 

    useEffect(() => {
        // Realiza la consulta a la API y guarda los resultados en "allData"
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/cliente/index');
            if (response.ok) {
              const data = await response.json();
              
            //   setProducts(data);
              setAllData(data);
            } else {
              console.error('Error en la solicitud a la API');
            }
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
      
        fetchData();
      }, []);

    

    const handleInputChange = (e) => {

        // console.log(e.value.nombre);
        setSearchQuery(e.value); // Llama a setSearchQuery
        console.log("search ",searchQuery);

        onInputChange(e.value.id, 'cliente'); // Llama a onInputChange
      }
    //-------------------------------------------




    const [searchResultsDis, setSearchResultsDis] = useState([]);
    const [searchQueryDis, setSearchQueryDis] = useState('');
    const [allDataDis, setAllDataDis] = useState([]);

    const [searchResultsTipo, setSearchResultsTipo] = useState([]);
    const [searchQueryTipo, setSearchQueryTipo] = useState('');
    const [allDataTipo, setAllDataTipo] = useState([]);


    
      
      

    // useEffect(() => {
        
    //     fetch('http://localhost:8080/cliente/index')

    //       .then((response) => {
    //         if (response.ok) {
    //           return response.json(); 
    //         } else {
    //           throw new Error('Error en la solicitud a la API');
    //         }
    //       })
    //       .then((data) => {
    //         console.log(data);
    //         setProducts(data);
    //       })
    //       .catch((error) => {
    //         console.error('Error al obtener datos de la API:', error);
    //       });
    //   }, []);
      

      // disciplina
      useEffect(() => {
        // Realiza la consulta a la API y guarda los resultados en "allData"
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/disciplina');
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            //   setProducts(data);
              setAllDataDis(data);
            } else {
              console.error('Error en la solicitud a la API');
            }
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
      
        fetchData();
      }, []);


      const handleInputChangeDis = (e) => {

        console.log(e.value.nombre);
        if (!selectedItems.includes(e.value.nombre)) {
            setSelectedItems([...selectedItems, e.value.nombre]);
          }
        setSearchQueryDis(e.value); // Llama a setSearchQuery
        onInputArrayChange(selectedItems, 'disciplina'); // Llama a onInputChange
      }

    //   const searchInDataDis = (query) => {
    //     const filteredData = allDataDis.filter((item) => item.name.includes(query));
    //     setSearchResultsDis(filteredData);
    //   };

    //   const dropdownOptionsDis = searchResultsDis.map((result) => ({
    //     label: result.name,
    //     value: result.name,
    //   }));



    //tipo de pago
    useEffect(() => {
        // Realiza la consulta a la API y guarda los resultados en "allData"
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/tipo');
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            //   setProducts(data);
              setAllDataTipo(data);
            } else {
              console.error('Error en la solicitud a la API');
            }
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
      
        fetchData();
      }, []);


    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {

        setProduct(emptyProduct)
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };



    


    const saveProduct = () => {
        setSubmitted(true);
        
        // console.log('Datos de product antes de guardar:', selectedItems);
        

        
            console.log("dentro")
            // let _products = [...products];

            if (product.cliente) {

                const datos = {
                    cliente: product.cliente,
                    disciplina: selectedItems,
                    fecha:product.fecha,
                    pago: product.pago,
                    monto: product.monto 
                };

        

                // fetch('http://localhost:8080/cliente/update/'+product.id, {
                //     method: 'PUT',
                //     headers: {
                //     'Content-Type': 'application/json',
                //          },
                //             body: JSON.stringify(datos),
                //                 })
                //                 .then((response) => {
                //                 if (response.ok) {
                //                      return response.json();
                //                  } else {
                //                     throw new Error('Error en la solicitud a la API');
                //                 }
                //                 })
                

            console.log(datos);
                
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                
                const datos = {
                    cliente: product.cliente,
                    disciplina: selectedItems,
                    fecha:product.fecha,
                    pago: product.pago,
                    monto: product.monto 
                };

                console.log(datos);
                

                // fetch('http://localhost:8080/cliente/create', {
                //     method: 'POST',
                //     headers: {
                //     'Content-Type': 'application/json',
                //          },
                //             body: JSON.stringify(datos),
                //                 })
                //                 .then((response) => {
                //                 if (response.ok) {
                //                      return response.json();
                //                  } else {
                //                     throw new Error('Error en la solicitud a la API');
                //                 }
                //                 })

                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });

            }
            
            // setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        
    };
    
    

    const onInputChange = (e, name) => {
        let _product = { ...product };
        _product[`${name}`] = e;
        console.log(_product);
        setProduct(_product);
       
    };

    

    const handleInputChangeTipo = (e) => {

        // console.log(e.value.tipo);
          
        setSearchQueryTipo(e.value); // Llama a setSearchQuery

        onInputChange(e.value.id, 'pago'); // Llama a onInputChange
    }

    const handleInputChangeFecha = (e) => {
        const selectedDate = e.value;
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');

        console.log(formattedDate);
          

        // onInputChange(e.value.id, 'fecha'); // Llama a onInputChange
    }



    //---------------------------------------

    const editProduct = (product) => {
        console.log(product);
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        fetch('http://localhost:8080/proveedor/delete/'+product.id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
                 },
                    body: JSON.stringify(),
                        })
                        .then((response) => {
                        if (response.ok) {
                             return response.json();
                         } else {
                            throw new Error('Error en la solicitud a la API');
                        }
                        })


        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };


    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };


    

    const onInputArrayChange = (e, name) => {


        // const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        // console.log("input change");
        // console.log(val.cod);

        // console.log(val.cliente);
        _product[`${name}`] = e;

        setProduct(_product);
       
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo cliente" icon="pi pi-plus" severity="success" onClick={openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    // boton para cvs
    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };



    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Adminisitrar clientes</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );


    const productDialogFooterEditar = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );



      


      


    const removeItem = (itemToRemove) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove[0]);
    setSelectedItems(updatedItems);
    };

   


    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );





    return (
        <div>
            <SideBarPage/>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>


                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    <Column field="id"  header="Codigo" sortable style={{ display: 'none' }}></Column>
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="apellido" header="Apellido" ></Column>
                    <Column field="ci"  header="Carnet" sortable ></Column>
                    <Column field="telefono"  header="Telefono" sortable ></Column>
                    {/* <Column field="fecha_nacimiento"  header="Fecha de nacimiento" body={(rowData)=> formatDate(rowData.fecha_nacimiento)} sortable ></Column> */}

                    <Column field="fecha_nacimiento" header="Fecha de Nacimiento"  sortable style={{ minWidth: "16rem" }}></Column>



                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            {/* crear uno nuevo */}
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle del cliente" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                
            
                
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">
                        Nombre
                    </label>
                    <Dropdown  id='nombre' name='nombre' value={searchQuery} onChange={handleInputChange} options={allData} optionLabel="nombre" placeholder="Selecciona un cliente" className="w-full md:w-18rem" />
                </div>

                <div className="field">
                    <label htmlFor="disciplina" className="font-bold">
                        Disciplinas
                    </label>
                    
                    <Dropdown multiple  id='disciplina' name='disciplina' value={searchQueryDis} onChange={handleInputChangeDis} options={allDataDis} optionLabel="nombre" placeholder="Selecciona una disciplina" className="w-full md:w-18rem" />
                </div>

                
                <h3>Disciplinas seleccionadas</h3>
                <Chips value={selectedItems} onRemove={(e) => removeItem(e.value)} />


                <div className="field">
                <label htmlFor="fecha" className="font-bold">
                    Fecha de inicio
                </label>
                <Calendar id="fecha"   value={product.fecha} onChange={(e) => handleInputChangeFecha(e)} showIcon dateFormat="yy-mm-dd" required className={classNames({ "p-invalid": submitted && !product.fecha, })}/>
                {submitted && !product.fecha && (
                    <small className="p-error">
                    La fecha es requerida.
                    </small>
                )}
                </div>

                <div className="field">
                    <label htmlFor="tipo" className="font-bold">
                        Tipo de pago
                    </label>
                    
                    <Dropdown  id='tipo' name='tipo' value={searchQueryTipo} onChange={handleInputChangeTipo} options={allDataTipo} optionLabel="tipo" placeholder="Pago" className="w-full md:w-18rem" />
                </div>
                

                {/* <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="monto" className="font-bold">
                                    Monto
                                </label>
                                <InputNumber id="monto" value={product.monto} onValueChange={(e) => onInputNumberChange(e, 'monto')}  />
                            </div>
                            
                </div> */}



               
              
            </Dialog> 



           

            {/* <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                        Seguro que quieres eliminar <b>{product.empresa}</b>?
                        </span>
                    )}
                </div>
            </Dialog> */}

        
        </div>
    );
}
        
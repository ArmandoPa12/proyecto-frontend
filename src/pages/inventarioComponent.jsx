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

import { Dropdown } from 'primereact/dropdown';
        
import SideBarPage from './SideBarPage';

export default function ProductoComponent() {


    // let emptyProduct = {
    //     id: null,
    //     name: '',
    //     image: null,
    //     description: '',
    //     category: null,
    //     price: 0,
    //     quantity: 0,
    //     rating: 0,
    //     inventoryStatus: 'INSTOCK'
    // };


    let emptyProduct = {
        cod: null,
        nombre: '',
        cantidad: 0,
        precio: 0,
        categoria:''
    };

    let emptyEntrada = {
        cod: null,
        nombre: '',
        cantidad: 0,
        precio: 0,
        proveedor:'',
        id:null
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [entradaDialog, setEntradaDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [entrada, setEntrada] = useState(emptyEntrada);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [categorias, setCategorias] = useState([]);


    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [allData, setAllData] = useState([]); // Variable para almacenar todos los datos de la API

    //fetch de busqueda
    useEffect(() => {
        // Realiza la consulta a la API y guarda los resultados en "allData"
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/producto/index');
            if (response.ok) {
              const data = await response.json();
              console.log("busqueda");
              console.log(data);
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
      
      const searchInData = (query) => {
        const filteredData = allData.filter((item) => item.name.includes(query));
        setSearchResults(filteredData);
      };

      const dropdownOptions = searchResults.map((result) => ({
        label: result.name,
        value: result.name,
      }));


    //fetch de categorias
      useEffect(() => {
        // Realiza una solicitud GET a la API externa usando fetch
        // fetch('https://fakestoreapi.com/products')
        fetch('http://localhost:8080/proveedor')

          .then((response) => {
            // Verifica si la solicitud fue exitosa y obtén los datos
            if (response.ok) {
              return response.json(); // Convierte la respuesta a JSON
            } else {
              throw new Error('Error en la solicitud a la API');
            }
          })
          .then((data) => {
            // Almacena los datos en el estado local
            console.log(data);
            setCategorias(data);
          })
          .catch((error) => {
            console.error('Error al obtener datos de la API:', error);
          });
      }, []);

    useEffect(() => {
        // Realiza una solicitud GET a la API externa usando fetch
        // fetch('https://fakestoreapi.com/products')
        fetch('http://localhost:8080/inventario/index')

          .then((response) => {
            // Verifica si la solicitud fue exitosa y obtén los datos
            if (response.ok) {

              return response.json(); // Convierte la respuesta a JSON
            } else {
              throw new Error('Error en la solicitud a la API');
            }
          })
          .then((data) => {
            // Almacena los datos en el estado local
            console.log(data);
            setProducts(data);
          })
          .catch((error) => {
            console.error('Error al obtener datos de la API:', error);
          });
      }, []);
      

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setEntrada(emptyEntrada);
        setSubmitted(false);
        setEntradaDialog(true);
    };

    const hideEntradaDialog = () => {
        setSubmitted(false);
        setEntradaDialog(false);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    // const saveProduct = () => {
    //     setSubmitted(true);

    //     console.log('Datos de product antes de guardar:', product);
    //     if (product.name.trim()) {
    //         let _products = [...products];
    //         let _product = { ...product };

    //         if (product.id) {
    //             const index = findIndexById(product.id);

    //             _products[index] = _product;
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             _product.id = createId();
    //             _product.image = 'product-placeholder.svg';
    //             _products.push(_product);
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         setProducts(_products);
    //         setProductDialog(false);
    //         setProduct(emptyProduct);
    //     }
    // };



    // const saveProduct = () => {
    //     setSubmitted(true);
    
    //     if (product.nombre.trim()) {
    //         // Crea un objeto de datos para enviar en la solicitud POST
    //         const data = {
    //             id: product.id,
    //             nombre: product.nombre,
    //             descripcion: product.descripcion,
    //             id_categoria: product.id_categoria,
    //             precio: product.precio,
    //             // Otras propiedades de product que desees incluir
    //         };
    
    //         // Realiza la solicitud POST a tu API
    //         fetch('http://localhost:8080/producto/create', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         })
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Error en la solicitud a la API');
    //             }
    //         })
    //         .then((responseData) => {
    //             // Maneja la respuesta de la API si es necesario
    //             console.log('Respuesta de la API:', responseData);
    
    //             // Actualiza el estado local o realiza otras acciones según sea necesario
    //             let _products = [...products];
    //             let _product = { ...product };
    
    //             if (product.id) {
    //                 const index = findIndexById(product.id);
    
    //                 _products[index] = _product;
    //                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //             } else {
                    
    //                 _product.id = createId();
    //                 _product.image = 'product-placeholder.svg';
    //                 _products.push(_product);
    //                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //             }
    
    //             setProducts(_products);
    //             setProductDialog(false);
    //             setProduct(emptyProduct);
    //         })
    //         .catch((error) => {
    //             console.error('Error al enviar datos a la API:', error);
    //             // Maneja los errores si es necesario
    //         });
    //     }
    // };


    const saveProductEdit = () => {
        setSubmitted(true);
    
        if (product.nombre.trim()) {
            // Crea un objeto de datos para enviar en la solicitud POST
            const data = {
                id: product.id,
                nombre: product.nombre,
                descripcion: product.descripcion,
                id_categoria: product.id_categoria,
                precio: product.precio,
                // Otras propiedades de product que desees incluir
            };
    
            // Realiza la solicitud POST a tu API
            fetch('http://localhost:8080/producto/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud a la API');
                }
            })
            .then((responseData) => {
                // Maneja la respuesta de la API si es necesario
                console.log('Respuesta de la API:', responseData);
    
                // Actualiza el estado local o realiza otras acciones según sea necesario
                let _products = [...products];
                let _product = { ...product };
    
                if (product.id) {
                    const index = findIndexById(product.id);
    
                    _products[index] = _product;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } else {
                    _product.id = createId();
                    _product.image = 'product-placeholder.svg';
                    _products.push(_product);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
    
                setProducts(_products);
                setProductDialog(false);
                setProduct(emptyProduct);
            })
            .catch((error) => {
                console.error('Error al enviar datos a la API:', error);
                // Maneja los errores si es necesario
            });
        }
    };



    const saveNota = () => {
        setSubmitted(true);
        console.log(entrada);
        if (entrada.nombre.trim()) {
            let _products = [...entrada];
            let _product = { ...entrada };

            console.log(entrada);

            // if (entrada.id) {
            //     const index = findIndexById(product.id);

            //     _products[index] = _product;
            //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            // } else {
            //     _product.id = createId();
            //     _product.image = 'product-placeholder.svg';
            //     _products.push(_product);
            //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            // }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };






    const saveProduct = () => {
        setSubmitted(true);
    
        if (product.nombre.trim()) {
            let _products = [...products];
            let _product = { ...product };
            
            console.log("base");
            console.log(_product);
            if (_product.cod) {
                // Realiza una solicitud PUT si el producto tiene un id
                updateProduct(_product)
                    .then((updatedProduct) => {
                        const index = findIndexById(updatedProduct.id);
    
                        _products[index] = updatedProduct;
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                    })
                    .catch((error) => {
                        console.error('Error al actualizar el producto:', error);
                        // Maneja el error, muestra una notificación de error, etc.
                    });
            } else {
                // Realiza una solicitud POST si el producto no tiene un id
                
                createProduct(_product)
                    .then((createdProduct) => {
                        
                        _products.push(createdProduct);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                    })
                    .catch((error) => {
                        console.error('Error al crear el producto:', error);
                        // Maneja el error, muestra una notificación de error, etc.
                    });
            }
        }
    };
    
    // Función para actualizar un producto (PUT)
    const updateProduct = (product) => {
        // Realiza una solicitud PUT a la API con el producto a actualizar
        const data = {
            nombre: product.nombre,
            descripcion: product.descripcion,
            id_categoria: product.id_categoria,
            precio: product.precio,
        };
        console.log("funcion update");
        console.log(product);
        return fetch('http://localhost:8080/producto/update/' + product.cod, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud PUT a la API');
                }
            });
    };
    
    // Función para crear un nuevo producto (POST)
    const createProduct = (product) => {
        // Realiza una solicitud POST a la API con el nuevo producto

        const data = {
                        nombre: product.nombre,
                        descripcion: product.descripcion,
                        id_categoria: product.id_categoria,
                        precio: product.precio,
                    };
        
        return fetch('http://localhost:8080/producto/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud POST a la API');
                }
            });
    };
    





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
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
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

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
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

    const onCategoryChange = (e) => {
        // console.log(e.value);
        let _product = { ...entrada };
        // console.log(_product);
        _product['proveedor'] = e.value;
        setEntrada(_product);
    };

    const onInputChange = (e, name) => {
        console.log(name);
        const val = (e.target && e.target.value) || '';
        let _product = { ...entrada };

        _product[`${name}`] = val;

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
                <Button label="Nota entrada" icon="pi pi-plus" severity="success" onClick={openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    // boton para cvs
    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };



    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} /> */}
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Adminisitrar productos</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            {/* <Button label="Save" icon="pi pi-check" onClick={saveProduct} /> */}
        </React.Fragment>
    );


    const EntradaDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideEntradaDialog} />
            <Button label="Guardar nota" icon="pi pi-check" onClick={saveNota} />
        </React.Fragment>
    );



    const productDialogFooterEditar = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );




    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


    const handleInputChange = (e) => {

        console.log("nom");
        console.log(e.value);
        setSearchQuery(e.value); // Llama a setSearchQuery
        onInputChange(e, 'nombre'); // Llama a onInputChange
      };

    return (
        <div>
            <SideBarPage/>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="cod"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>


                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="cod" header="Codigo" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="categoria" style={{ display:'none' }}></Column>             
                    <Column field="precio" header="Precio" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="cantidad" header="Cantidad" sortable style={{ minWidth: '8rem' }}></Column>

                   
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            {/* crear uno nuevo */}
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle de inventario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                
                {/* nombre */}
                
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">
                        Nombre
                    </label>
                    <InputText disabled id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} readOnly/>
                    {submitted && !product.name && <small className="p-error">Nombre es requerido.</small>}
                </div>

                {/* categoria */}
                
                <div className="field">
                    <label htmlFor="categoria" className="font-bold">
                        Categoria
                    </label>
                    <InputText disabled readOnly id="categoria" value={product.categoria} onChange={(e) => onInputChange(e, 'categoria')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.categoria })} />
                    {submitted && !product.categoria && <small className="p-error">Nombre es requerido.</small>}
                </div>

                    {/* cantidad */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="cantidad" className="font-bold">
                                    Cantidad
                                </label>
                                <InputNumber disabled readOnly id="cantidad" value={product.cantidad} onValueChange={(e) => onInputNumberChange(e, 'cantidad')}  />
                            </div>
                            
                        </div>



                
                {/* precio */}
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="precio" className="font-bold">
                            Precio
                        </label>
                        <InputNumber readOnly disabled id="precio" value={product.precio} onValueChange={(e) => onInputNumberChange(e, 'precio')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>
            </Dialog> 





            <Dialog visible={entradaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle nota entrada" modal className="p-fluid" footer={EntradaDialogFooter} onHide={hideEntradaDialog}>
                

            


                {/* nombre */}
                
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">
                        Nombre
                    </label>
                    {/* <InputText disabled id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} readOnly/>
                    {submitted && !product.name && <small className="p-error">Nombre es requerido.</small>} */}
                    <Dropdown  id='nombre' name='nombre' value={searchQuery} onChange={handleInputChange} options={allData} optionLabel="nombre" placeholder="Selecciona un producto" className="w-full md:w-18rem" />
                </div>

                {/* proveedor*/}
                
                <div className="field">
                    <label className="mb-3 font-bold">Categoria</label>
                    <div className="formgrid grid">
                        {categorias.map((categoria) => (
                        <div className="field-radiobutton col-6" key={categoria.id}>
                            <RadioButton inputId={`categoria${categoria.id}`} name="categoria" value={categoria.empresa} onChange={onCategoryChange} checked={product.id_categoria === categoria.id}/>
                            <label htmlFor={`categoria${categoria.id}`}>{categoria.empresa}</label>
                        </div>
                        ))}
                    </div>
                </div>

                    {/* cantidad */}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="cantidad" className="font-bold">
                                    Cantidad
                                </label>
                                <InputNumber  id="cantidad" value={entrada.cantidad} onValueChange={(e) => onInputNumberChange(e, 'cantidad')}  />
                            </div>
                            
                        </div>



                
                {/* precio */}
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="precio" className="font-bold">
                            Precio
                        </label>
                        <InputNumber id="precio" value={entrada.precio} onValueChange={(e) => onInputNumberChange(e, 'precio')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    
                </div>
            </Dialog> 



           

            {/* <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog> */}

            {/* <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> */}
        </div>
    );
}
        
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

export default function categoriaComponent() {


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
        id: null,
        empresa: '',
        telefono: '',
    
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

    const [categorias, setCategorias] = useState([]);

    // obtener productos
    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []);



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
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
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


    const saveProduct = () => {
        setSubmitted(true);
    
        if (product.empresa.trim()) {
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
        let _product = { ...product };

        _product['id_categoria'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

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
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
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
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
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
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
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


                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id"  header="Codigo" sortable style={{ display: 'none' }}></Column>
                    <Column field="empresa" header="Empresa" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="telefono" header="Telefono" ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            {/* crear uno nuevo */}
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalle de la empresa" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                
                {/* nombre */}
                
                <div className="field">
                    <label htmlFor="empresa" className="font-bold">
                        Empresa
                    </label>
                    <InputText id="empresa" value={product.empresa} onChange={(e) => onInputChange(e, 'empresa')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.empresa })} />
                    {submitted && !product.empresa && <small className="p-error">Empresa es requerido.</small>}
                </div>

                {/* descripcion */}
                <div className="field">
                    <label htmlFor="telefono" className="font-bold">
                        Telefono
                    </label>
                    <InputTextarea id="telefono" value={product.telefono} onChange={(e) => onInputChange(e, 'telefono')} required rows={3} cols={20} />
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
        
import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Début de la requête');
      const response = await fetch('/api/products');
      console.log('Statut de la réponse:', response.status);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits.');
      }
      const data = await response.json();
      console.log('Données reçues:', data);
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.nom_produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#000c1b]">
        <div className="text-text-sky-900 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-sky-900 text-2xl mb-8 text-center">
          Catalogue des Médicaments
        </h1>

        {error && (
          <div className="bg-[#fc8181] text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-[500px] px-4 py-3 border border-[#003a66] rounded-lg text-sky-900 mx-auto block placeholder:text-[#4a5568]"
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 max-md:grid-cols-1">
          {filteredProducts.map((product) => (
            <div
              key={product.id_t_produit}
              className="rounded-lg overflow-hidden h-[67vh] w-full transition-transform transition-shadow duration-200 shadow-md hover:-translate-y-[5px] hover:shadow-[0_8px_12px_rgba(0,0,0,0.2)] max-md:max-w-[400px] max-md:mx-auto"
            >
              <div className="h-[200px] overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.nom_produit}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="h-full bg-[#002b4d] flex items-center justify-center text-[#4a5568]">
                    <span>Image non disponible</span>
                  </div>
                )}
              </div>
              <div className="p-6 h-[80%]">
                <h3 className="text-sky-900 text-xl mb-2">
                  {product.nom_produit}
                </h3>
                <p className="text-[#a0aec0] mb-4 text-sm">
                  {product.description}
                </p>
                <div className="flex flex-col h-[35%]">
                  <div className="text-[#a0aec0] text-sm mb-2">
                    <span className="text-sky-900 font-semibold mr-2">Forme:</span> {product.forme}
                  </div>
                  <div className="text-[#a0aec0] text-sm mb-2">
                    <span className="text-sky-900 font-semibold mr-2">Dosage:</span> {product.dosage}
                  </div>
                  <div className="text-[#a0aec0] text-sm mb-2">
                    <span className="text-sky-900 font-semibold mr-2">Laboratoire:</span> {product.laboratoire_fabriquant}
                  </div>
                  {product.restrictions && (
                    <div className="text-[#fc8181] text-sm mb-2">
                      <span className="text-sky-900 font-semibold mr-2">Restrictions:</span> {product.restrictions}
                    </div>
                  )}
                  {product.conservation && (
                    <div className="text-[#a0aec0] text-sm mb-2">
                      <span className="text-sky-900 font-semibold mr-2">Conservation:</span> {product.conservation}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#003a66]">
                  <span className="text-[#4299e1] text-xl font-bold">
                    {product.prix}€
                  </span>
                  <button className="bg-[#003a66] text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#004d80]">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-sky-900 p-8 text-center">
            Aucun produit trouvé.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
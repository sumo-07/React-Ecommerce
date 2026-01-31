<div className="filter-container">
                {/* Category filter */}
                <select id="category" className="product-category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
                    <option value="all">All Categories</option>
                    {categoryData?.data?.map((categ) => (
                        <option key={categ.slug} value={categ.slug} >
                            {categ.name}
                        </option>
                    ))}
                </select>


                {/* Sort by price */}
                <select id="sort-price" className="product-sort-filter" value={sortPrice} 
                    onChange={(e) => {
                        setSortPrice(e.target.value); 
                        setSortRating("");
                }}  >
                    <option value="">Sort by Price</option>
                    <option value="price-low-high">Price: Low → High</option>
                    <option value="price-high-low">Price: High → Low</option>
                </select>

                {/* Sort by rating */}
                <select id="sort-rating" className="product-category-filter" value={sortRating} 
                onChange={(e) => {
                    setSortRating(e.target.value)
                    setSortPrice("");     
                }} >
                    <option value="">Sort by Rating</option>
                    <option value="rating-low-high">Rating: Low → High</option>
                    <option value="rating-high-low">Rating: High → Low</option>
                </select>
            </div>
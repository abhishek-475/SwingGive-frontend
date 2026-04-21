import React, { useState, useEffect } from 'react';
import { charityService } from '../services';
import { Heart, ExternalLink, Sparkles } from 'lucide-react';

const Charities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharity, setSelectedCharity] = useState(null);

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const data = await charityService.getAllCharities();
      setCharities(data || []);
    } catch (error) {
      console.error(error);
      setCharities([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
        <p className="mt-3 text-gray-600">Loading charities...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
            <Sparkles size={14} /> Real impact through every game
          </div>

          <h1 className="text-5xl font-extrabold mt-6">
            Partner <span className="text-emerald-600">Charities</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Every subscription contributes to meaningful causes. Choose where your impact goes.
          </p>
        </div>

        {/* FEATURED */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {charities
              .filter(c => c.isFeatured)
              .map(charity => (
                <div
                  key={charity._id}
                  className="group relative bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >

                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      Featured
                    </span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-emerald-600 transition">
                        {charity.name}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {charity.description}
                      </p>

                      {charity.website && (
                        <a
                          href={charity.website}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-emerald-600 mt-4 hover:underline"
                        >
                          Visit website <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl">
                      <Heart className="text-emerald-600" />
                    </div>
                  </div>

                </div>
              ))}
          </div>
        </div>

        {/* ALL CHARITIES */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Causes</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {charities.map(charity => (
              <div
                key={charity._id}
                className="group bg-white border rounded-2xl p-6 hover:shadow-lg transition hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold group-hover:text-emerald-600">
                  {charity.name}
                </h3>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {charity.description}
                </p>

                <button
                  onClick={() => setSelectedCharity(charity)}
                  className="mt-5 text-emerald-600 font-medium hover:underline"
                >
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL */}
      {selectedCharity && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCharity(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {selectedCharity.name}
              </h2>

              <button
                onClick={() => setSelectedCharity(null)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {selectedCharity.description}
            </p>

            {selectedCharity.website && (
              <a
                href={selectedCharity.website}
                target="_blank"
                className="inline-flex items-center gap-1 mt-5 text-emerald-600 hover:underline"
              >
                Visit website <ExternalLink size={14} />
              </a>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Charities;
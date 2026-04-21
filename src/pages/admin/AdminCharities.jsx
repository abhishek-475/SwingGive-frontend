import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { charityService } from '../../services'
import toast from 'react-hot-toast'
import { Plus, Edit2, Trash2, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminCharities = () => {
  const [charities, setCharities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCharity, setEditingCharity] = useState(null)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    image: '',
    isFeatured: false
  })

  useEffect(() => {
    fetchCharities()
  }, [])

  const fetchCharities = async () => {
    try {
      const data = await charityService.getAllCharities()
      setCharities(data || [])
    } catch (error) {
      toast.error('Failed to load charities')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingCharity) {
        await charityService.updateCharity(editingCharity._id, formData)
        toast.success('Charity updated')
      } else {
        await charityService.createCharity(formData)
        toast.success('Charity created')
      }

      setShowModal(false)
      resetForm()
      fetchCharities()

    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving charity')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this charity?')) return

    try {
      await charityService.deleteCharity(id)
      toast.success('Deleted successfully')
      fetchCharities()
    } catch {
      toast.error('Delete failed')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      website: '',
      image: '',
      isFeatured: false
    })
    setEditingCharity(null)
  }

  const editCharity = (charity) => {
    setEditingCharity(charity)

    // SAFE mapping only required fields
    setFormData({
      name: charity.name || '',
      description: charity.description || '',
      website: charity.website || '',
      image: charity.image || '',
      isFeatured: charity.isFeatured || false
    })

    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <button
          onClick={() => navigate('/admin')}
          className="text-sm text-gray-600 hover:text-green-600"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 bg-white rounded-lg shadow-md">

        {/* Top bar */}
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold">Charity Management</h1>

          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {/* List */}
        <div className="p-6">

          {charities.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No charities found
            </p>
          ) : (

            <div className="grid md:grid-cols-2 gap-6">
              {charities.map((c) => (
                <div key={c._id} className="border rounded-lg p-4 hover:shadow">

                  <div className="flex justify-between">

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{c.name}</h3>
                        {c.isFeatured && (
                          <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {c.description}
                      </p>

                      {c.website && (
                        <a
                          href={c.website}
                          target="_blank"
                          className="text-green-600 text-sm"
                        >
                          Visit →
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => editCharity(c)}>
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(c._id)}>
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md p-6 rounded-lg">

            <h2 className="text-xl font-bold mb-4">
              {editingCharity ? 'Edit' : 'Add'} Charity
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                />
                Featured
              </label>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default AdminCharities
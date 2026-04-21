import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiCheck, FiHeart } from 'react-icons/fi'
import { paymentService } from '../services'

const Subscribe = () => {
  const { user } = useAuth()
  const [loadingPlan, setLoadingPlan] = useState(null)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan)

    try {
      //  CREATE ORDER (service used)
      const order = await paymentService.createOrder(plan)

      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        toast.error('Payment gateway failed to load')
        setLoadingPlan(null)
        return
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'SwingGive',
        description: `${plan} subscription`,

        prefill: {
          name: user?.name,
          email: user?.email
        },

        theme: {
          color: '#16a34a'
        },

        // VERIFY PAYMENT
        handler: async (response) => {
          try {
            const payload = {
              razorpay_order_id: order.id,   // ✅ FROM YOUR CREATED ORDER
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan
            };

            const data = await paymentService.verifyPayment(payload);

            if (data?.success) {
              toast.success('Subscription activated ');
              window.location.href = '/dashboard';
            } else {
              toast.error('Payment verification failed');
            }

          } catch (err) {
            toast.error(err?.response?.data?.message || 'Verification error');
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create order')
    } finally {
      setLoadingPlan(null)
    }
  }

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: '₹199',
      period: '/month',
      features: [
        'Enter monthly draws',
        'Track scores',
        'Support charity',
        'Cancel anytime'
      ]
    },
    yearly: {
      name: 'Yearly Plan',
      price: '₹1999',
      period: '/year',
      features: [
        'Save money annually',
        'All monthly benefits',
        'Priority support',
        'Exclusive badges'
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Choose Plan</h1>
          <p className="text-gray-600 mt-2">
            Every subscription supports charity 🎗️
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div key={key} className="bg-white shadow-lg rounded-xl p-6">

              {key === 'yearly' && (
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}

              <h2 className="text-2xl font-bold mt-2">{plan.name}</h2>

              <div className="my-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FiCheck className="text-green-600" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(key)}
                disabled={loadingPlan === key}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loadingPlan === key ? 'Processing...' : 'Subscribe'}
              </button>

            </div>
          ))}
        </div>

        {/* Charity note */}
        <div className="mt-10 text-center bg-green-50 p-6 rounded-lg">
          <FiHeart className="mx-auto text-green-600 text-2xl mb-2" />
          <p className="font-semibold">10% goes to charity</p>
          <p className="text-sm text-gray-600">
            Supporting your selected cause every month
          </p>
        </div>

      </div>
    </div>
  )
}

export default Subscribe
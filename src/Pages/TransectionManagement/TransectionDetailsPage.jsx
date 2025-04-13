import React, { useState } from 'react';
import { 
  CreditCard, CheckCircle2, XCircle, RefreshCcw, 
  User, Calendar, DollarSign, Tag, MapPin, Mail, Phone,
  Clock, Wallet, FileText, Info 
} from 'lucide-react';
import dummyPayments from './transectionData';
import { useParams } from 'react-router-dom';

const TransectionDetailsPage = () => {
  const [refundStatus, setRefundStatus] = useState(null);
  const {id} = useParams()

  // Find the specific payment based on transactionId
  const payment = dummyPayments[id];

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR' 
    }).format(amount);

  const formatDate = (date) => 
    new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium', 
      timeStyle: 'short'
    });

  const handleRefund = () => {
    setRefundStatus('processing');
    setTimeout(() => {
      setRefundStatus('completed');
    }, 2000);
  };

  const renderPaymentMethodDetails = () => {
    switch(payment.paymentMethod) {
      case 'card':
        return (
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center">
              <CreditCard className="mr-2" /> Card Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Card Number</span>
                  <span>{payment.paymentInfo?.cardNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Card Holder</span>
                  <span>{payment.paymentInfo?.cardHolderName || 'N/A'}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Expiry Date</span>
                  <span>{payment.paymentInfo?.expiryDate || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'UPI':
        return (
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center">
              <CreditCard className="mr-2" /> UPI Details
            </h3>
            <div className="flex justify-between">
              <span>UPI ID</span>
              <span>{payment.paymentInfo?.upiId || 'N/A'}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Transaction Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-3xl font-bold text-orange-600">
              Transaction Details
            </h1>
            {payment.paymentStatus === 'paid' && refundStatus !== 'completed' && (
              <button
                onClick={handleRefund}
                disabled={refundStatus === 'processing'}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center disabled:opacity-50"
              >
                <RefreshCcw size={16} className="mr-2" />
                {refundStatus === 'processing' ? 'Processing...' : 'Initiate Refund'}
              </button>
            )}
          </div>

          {/* Refund Status Notification */}
          {refundStatus === 'completed' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              Refund successfully processed for customer
            </div>
          )}

          {/* Customer Information */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-orange-600 mb-3 flex items-center">
              <User className="mr-2" /> Customer Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-medium mr-2">Name:</span>
                  {payment.paymentBy.fullname.firstName} {payment.paymentBy.fullname.lastName}
                </div>
                <div className="flex items-center mb-2">
                  <Mail className="mr-2 text-orange-600" />
                  {payment.paymentBy.email}
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 text-orange-600" />
                  {payment.paymentBy.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center">
                <Wallet className="mr-2" /> Payment Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Transaction Amount</span>
                  <span>{formatCurrency(payment.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Refund Amount</span>
                  <span>{formatCurrency(payment.refundAmount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center">
                <FileText className="mr-2" /> Transaction Info
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span>{payment.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span>{payment.paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time</span>
                  <span>{formatDate(payment.transactionDateAndTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status</span>
                  <span>{payment.paymentStatus.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Details */}
          {renderPaymentMethodDetails()}

          {/* Refund Details (if applicable) */}
          {payment.paymentRefundStatus && (
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              <h2 className="text-xl font-semibold text-orange-600 mb-3 flex items-center">
                <Clock className="mr-2" /> Refund Information
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Refund Method</span>
                  <span>{payment.paymentRefundMethod?.toUpperCase() || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Refund Transaction ID</span>
                  <span>{payment.paymentRefundTransactionId || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Refund Date & Time</span>
                  <span>
                    {payment.paymentRefundDateAndTime 
                      ? formatDate(payment.paymentRefundDateAndTime) 
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Refund Status</span>
                  <span>{payment.paymentRefundStatus?.toUpperCase() || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransectionDetailsPage;
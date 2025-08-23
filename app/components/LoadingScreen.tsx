"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [password, setPassword] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Use a generic demo password instead of personal one
  const fullPassword = "demo2025"
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setCurrentStep(2)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep])
  
  useEffect(() => {
    if (currentStep === 2) {
      const timer = setTimeout(() => {
        setCurrentStep(3)
        setIsTyping(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep])
  
  useEffect(() => {
    if (isTyping && password.length < fullPassword.length) {
      const timer = setTimeout(() => {
        setPassword(fullPassword.slice(0, password.length + 1))
      }, 150)
      
      return () => clearTimeout(timer)
    } else if (isTyping && password.length === fullPassword.length) {
      const timer = setTimeout(() => {
        setCurrentStep(4)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isTyping, password, fullPassword])
  
  useEffect(() => {
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, onComplete])
  
  return (
    <AnimatePresence>
      {currentStep < 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#FAFAF0] flex items-center justify-center"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px),
              repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px)
            `,
            backgroundSize: "8px 8px, 8px 8px",
          }}
        >
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "2px 2px",
            }}
          />
          
          <div className="text-center relative z-10">
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: currentStep >= 1 ? 1 : 0, 
                opacity: currentStep >= 1 ? 1 : 0 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full border-[3px] border-black shadow-[6px_6px_0_0_#000] overflow-hidden bg-white"
            >
              <img
                src="/placeholder-user.jpg"
                alt="Vedant"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: currentStep >= 2 ? 0 : 20, 
                opacity: currentStep >= 2 ? 1 : 0 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-black text-black mb-8"
            >
              Vedant
            </motion.h1>
            
            {/* Password Field */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: currentStep >= 3 ? 0 : 20, 
                opacity: currentStep >= 3 ? 1 : 0 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <label className="text-lg font-semibold text-black">Password:</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    readOnly
                    className="w-48 px-4 py-2 border-[3px] border-black bg-white shadow-[4px_4px_0_0_#000] font-mono text-lg focus:outline-none"
                    placeholder="Enter password..."
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-black rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Login Button */}
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: currentStep >= 3 ? 1 : 0.8, 
                  opacity: currentStep >= 3 ? 1 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="px-6 py-3 bg-black text-white font-bold border-[3px] border-black shadow-[4px_4px_0_0_#FF2E63] hover:shadow-[6px_6px_0_0_#FF2E63] transition-all duration-200"
              >
                Login
              </motion.button>
            </motion.div>
            
            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentStep >= 4 ? 1 : 0 
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-green-600 font-semibold"
            >
              ✓ Access granted! Welcome back, Vedant.
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

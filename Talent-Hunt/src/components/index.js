// src/components/common/index.js
// Import individual components
import Button from './common/Button';
import Card from './common/Card';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import LoadingSpinner from './common/LoadingSpinner';
import ConfidenceScore from './common/ConfidenceScore';
import filterPanel from './directServices/FilterPanel';

// Export as named exports
export {
  Button,
  Card,
  Navbar,
  Footer,
  ConfidenceScore,
  LoadingSpinner,
  filterPanel
};

// Alternative export format with default
export default {
  Button,
  Card,
  Navbar,
  Footer,
  SearchInput,
  ConfidenceScore,
  LoadingSpinner,
  Modal,
  Tabs,
  Input
};
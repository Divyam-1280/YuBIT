import React, { useState } from 'react';
import { Pill, MapPin, ExternalLink, Navigation, Loader2, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SupplementRecommendations({ dailyAnalysis, analyzing, onRefresh, hasMeals }) {
    const [locating, setLocating] = useState(false);
    const [locationError, setLocationError] = useState('');

    const findNearbyKendra = (retry = false) => {
        setLocating(true);
        setLocationError('');

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setLocating(false);
            return;
        }

        // Use lower accuracy for faster response, increase timeout
        const options = {
            enableHighAccuracy: false, // Faster, uses network location
            timeout: 30000, // 30 seconds
            maximumAge: 600000 // Cache for 10 minutes
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapsUrl = `https://www.google.com/maps/search/Jan+Aushadhi+Kendra/@${latitude},${longitude},14z`;
                window.open(mapsUrl, '_blank');
                setLocating(false);
            },
            (error) => {
                setLocating(false);

                // On timeout, offer to retry or search without location
                if (error.code === error.TIMEOUT && !retry) {
                    setLocationError('Location is taking too long. Retrying...');
                    // Retry once with even more relaxed settings
                    setTimeout(() => findNearbyKendra(true), 500);
                    return;
                }

                let errorMsg = 'Unable to get your location. ';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = 'Location unavailable. Try the Search button instead.';
                        break;
                    case error.TIMEOUT:
                        errorMsg = 'Location timed out. Try the Search button instead.';
                        break;
                }
                setLocationError(errorMsg);
            },
            options
        );
    };

    const searchWithoutLocation = () => {
        window.open('https://www.google.com/maps/search/Jan+Aushadhi+Kendra', '_blank');
    };

    // No meals logged yet
    if (!hasMeals) {
        return (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Pill className="text-green-600" size={18} />
                    Daily Nutrition Analysis
                </h3>
                <div className="text-center py-4 text-gray-500 text-sm">
                    Log meals to see nutrition analysis
                </div>
            </div>
        );
    }

    // Analyzing in progress
    if (analyzing) {
        return (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Pill className="text-green-600" size={18} />
                    Daily Nutrition Analysis
                </h3>
                <div className="text-center py-6">
                    <Loader2 className="animate-spin mx-auto text-green-600 mb-3" size={28} />
                    <p className="text-gray-600 text-sm">Analyzing all your meals...</p>
                </div>
            </div>
        );
    }

    // No analysis yet but has meals
    if (!dailyAnalysis && hasMeals) {
        return (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Pill className="text-green-600" size={18} />
                    Daily Nutrition Analysis
                </h3>
                <div className="text-center py-4">
                    <p className="text-gray-500 text-sm mb-3">Analysis not yet run for today</p>
                    <button
                        onClick={onRefresh}
                        className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={14} />
                        Analyze Now
                    </button>
                </div>
            </div>
        );
    }

    const hasDeficiencies = dailyAnalysis?.deficiencies?.length > 0;
    const hasRecommendations = dailyAnalysis?.recommendations?.length > 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Pill className="text-green-600" size={18} />
                    Daily Analysis
                </h3>
                <button
                    onClick={onRefresh}
                    disabled={analyzing}
                    className="text-xs text-gray-500 hover:text-green-600 flex items-center gap-1"
                >
                    <RefreshCw size={12} />
                    Refresh
                </button>
            </div>

            {/* Overall Assessment */}
            {dailyAnalysis?.overallAssessment && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-700">
                    {dailyAnalysis.overallAssessment}
                </div>
            )}

            {/* Adequate Nutrients */}
            {dailyAnalysis?.adequateNutrients?.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        Well covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {dailyAnalysis.adequateNutrients.slice(0, 5).map((nutrient, i) => (
                            <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                {nutrient}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Deficiencies */}
            {hasDeficiencies ? (
                <div className="space-y-3 mb-4">
                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <AlertTriangle size={12} className="text-orange-500" />
                        Areas to improve:
                    </p>
                    {dailyAnalysis.deficiencies.map((def, index) => (
                        <div
                            key={index}
                            className={`rounded-lg p-3 border ${def.severity === 'high' ? 'bg-red-50 border-red-200' :
                                def.severity === 'medium' ? 'bg-orange-50 border-orange-200' :
                                    'bg-yellow-50 border-yellow-200'
                                }`}
                        >
                            <div className="flex items-start gap-2">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${def.severity === 'high' ? 'bg-red-200 text-red-800' :
                                    def.severity === 'medium' ? 'bg-orange-200 text-orange-800' :
                                        'bg-yellow-200 text-yellow-800'
                                    }`}>
                                    {def.severity}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Low in {def.nutrient}</p>
                                    <p className="text-xs text-gray-600 mt-1">{def.reason}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 mb-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <p className="text-green-700 text-sm font-medium">Great nutrition today!</p>
                    <p className="text-gray-500 text-xs">No major deficiencies detected</p>
                </div>
            )}

            {/* Recommendations */}
            {hasRecommendations && (
                <div className="space-y-2 mb-4">
                    <p className="text-xs font-medium text-gray-500">Supplement suggestions:</p>
                    {dailyAnalysis.recommendations.slice(0, 2).map((rec, index) => (
                        <div key={index} className="bg-green-50 border border-green-100 rounded-lg p-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">{rec.deficiency}</p>
                            <p className="text-xs text-gray-600 mb-2">{rec.suggestion}</p>
                            {rec.jan_aushadhi_product && (
                                <div className="flex items-center gap-2 text-xs text-green-700 bg-white rounded px-2 py-1">
                                    <MapPin size={10} />
                                    <span>{rec.jan_aushadhi_product}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Find Nearby Kendra Section */}
            {hasRecommendations && (
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                        <Navigation size={12} className="text-orange-600" />
                        Find Jan Aushadhi Kendra
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={findNearbyKendra}
                            disabled={locating}
                            className="btn-primary py-2 rounded-lg flex items-center justify-center gap-1 text-xs disabled:opacity-70"
                        >
                            {locating ? <Loader2 className="animate-spin" size={12} /> : <Navigation size={12} />}
                            Near Me
                        </button>
                        <button
                            onClick={searchWithoutLocation}
                            className="py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1 text-xs"
                        >
                            <MapPin size={12} />
                            Search
                        </button>
                    </div>

                    {locationError && (
                        <p className="mt-2 text-xs text-red-500">{locationError}</p>
                    )}
                </div>
            )}
        </div>
    );
}

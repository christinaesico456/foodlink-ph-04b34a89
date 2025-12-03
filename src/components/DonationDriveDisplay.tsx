import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DonationDriveDisplay = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial total
    const fetchTotal = async () => {
      const { data, error } = await supabase
        .from('gamification_donations')
        .select('amount');
      
      if (!error && data) {
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        setTotalDonations(total);
      }
      setLoading(false);
    };

    fetchTotal();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('donations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'gamification_donations'
        },
        (payload) => {
          if (payload.new && typeof payload.new.amount === 'number') {
            setTotalDonations(prev => prev + payload.new.amount);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-3 mb-4 border border-primary/20">
      <div className="text-center">
        <p className="text-xs font-semibold text-muted-foreground mb-0.5">
          🎯 Community Donation Drive
        </p>
        <p className="text-3xl font-black text-primary mb-0.5">
          {loading ? "..." : `₱${totalDonations.toLocaleString()}`}
        </p>
        <p className="text-[10px] text-muted-foreground">
          Unlocked by users reaching new levels
        </p>
      </div>
    </div>
  );
};

export default DonationDriveDisplay;

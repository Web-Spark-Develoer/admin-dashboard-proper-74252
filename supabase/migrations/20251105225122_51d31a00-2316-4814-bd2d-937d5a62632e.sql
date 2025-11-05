-- Add current_location column to parcels table
ALTER TABLE parcels 
ADD COLUMN current_location TEXT;

-- Add comment for documentation
COMMENT ON COLUMN parcels.current_location IS 'The current physical location of the parcel during transit';

-- Update existing parcels to have a default current location based on status
UPDATE parcels 
SET current_location = 
  CASE 
    WHEN status = 'pending' THEN origin
    WHEN status = 'delivered' THEN destination
    WHEN status = 'in_transit' THEN 'In Transit'
    ELSE origin
  END
WHERE current_location IS NULL;
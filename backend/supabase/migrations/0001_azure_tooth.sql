/*
  # NFT Marketplace Initial Schema

  1. New Tables
    - `nfts`
      - Stores NFT metadata and market data
      - Includes fields for tracking price history and ownership
    - `collections`
      - Stores NFT collection information
    - `transactions`
      - Records all NFT transactions
    - `user_watchlist`
      - Tracks which NFTs users are watching

  2. Security
    - Enable RLS on all tables
    - Policies for read/write access based on user authentication
*/

-- Collections table
CREATE TABLE collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  floor_price numeric(20,8) DEFAULT 0,
  volume_traded numeric(20,8) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- NFTs table
CREATE TABLE nfts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id text NOT NULL,
  collection_id uuid REFERENCES collections(id),
  name text NOT NULL,
  description text,
  image_url text,
  metadata jsonb,
  current_price numeric(20,8),
  owner_address text,
  listed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(collection_id, token_id)
);

-- Transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id uuid REFERENCES nfts(id),
  from_address text,
  to_address text,
  price numeric(20,8),
  transaction_hash text NOT NULL,
  transaction_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User watchlist
CREATE TABLE user_watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  nft_id uuid REFERENCES nfts(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, nft_id)
);

-- Enable RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Collections are viewable by everyone"
  ON collections FOR SELECT
  TO public
  USING (true);

CREATE POLICY "NFTs are viewable by everyone"
  ON nfts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Transactions are viewable by everyone"
  ON transactions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their own watchlist"
  ON user_watchlist
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX nfts_collection_id_idx ON nfts(collection_id);
CREATE INDEX transactions_nft_id_idx ON transactions(nft_id);
CREATE INDEX user_watchlist_user_id_idx ON user_watchlist(user_id);
CREATE INDEX user_watchlist_nft_id_idx ON user_watchlist(nft_id);